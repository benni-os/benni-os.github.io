import os
import re
import mimetypes
from http.server import SimpleHTTPRequestHandler, HTTPServer

class RangeRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_GET(self):
        mimetype, _ = mimetypes.guess_type(self.path)
        if mimetype and mimetype.startswith('video/'):
            f = self.send_head()
            if f:
                try:
                    self.copyfile(f, self.wfile)
                finally:
                    f.close()
            return
        
        # We need actual range support for Chrome video seeking.
        # SimpleHTTPRequestHandler doesn't do 206 Partial Content out of the box in older Pythons,
        # but in newer ones it might, or Chrome will just read the whole thing and IF 'Accept-Ranges' is present,
        # it might allow seeking once buffered.
        # Actually, let's implement proper Range handling for video.
        
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().do_GET()
            
        file_size = os.path.getsize(path)
        if 'Range' not in self.headers:
            return super().do_GET()
            
        # Parse Range
        range_header = self.headers.get('Range')
        m = re.search(r'bytes=(\d+)-(\d*)', range_header)
        if not m:
            self.send_error(400, "Bad Request")
            return
            
        start = int(m.group(1))
        end_str = m.group(2)
        end = int(end_str) if end_str else file_size - 1
        
        length = end - start + 1
        
        self.send_response(206)
        self.send_header('Content-type', self.guess_type(path))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
        self.send_header('Content-Length', str(length))
        self.send_header('Last-Modified', self.date_time_string(os.path.getmtime(path)))
        self.end_headers()
        
        with open(path, 'rb') as f:
            f.seek(start)
            chunk = f.read(length)
            try:
                self.wfile.write(chunk)
            except BrokenPipeError:
                pass

if __name__ == '__main__':
    port = 8001
    server_address = ('', port)
    httpd = HTTPServer(server_address, RangeRequestHandler)
    print(f"Serving on port {port} with Range support...")
    httpd.serve_forever()
