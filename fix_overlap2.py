import pathlib, re
p = pathlib.Path(r"C:\Users\T-GAMER\Documents\Projects\site novo\index.html")
t = p.read_text(encoding="utf-8")

# Find the updateBenjamin function that currently always adds is-active
# It starts with "    function updateBenjamin() {" and ends with "    }"
# We need to replace it with the 4-viewport version

# Use regex to find the function
import re
pattern = r"    function updateBenjamin\(\) \{\s+if \(!benSection\) return;\s+const rect = benSection\.getBoundingClientRect\(\);\s+const vh = window\.innerHeight;\s+const total = benSection\.offsetHeight - vh;\s+const p = Math\.min\(1, Math\.max\(0, -rect\.top / Math\.max\(1, total\)\)\);\s+if \(benCanvas\) benCanvas\.classList\.add\('is-active'\);.*?if \(benImg\) \{.*?ObjectPosition = \(70 - 20\*Math\.min\(1,p/0\.5\)\) \+ '% ' \+ \(30 \+ 20\*Math\.min\(1,p/0\.5\)\) \+ '%';\s+\}\s+\}"
m = re.search(pattern, t, re.S)
if m:
    print(f"found at {m.start()} len {len(m.group(0))}")
    old = m.group(0)
    new = """    const benQuote = document.getElementById('benjaminPullquote');
    const benCta = document.getElementById('benjaminCta');
    function updateBenjamin() {
      if (!benSection) return;
      const rect = benSection.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = benSection.offsetHeight - vh;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      const stmt = document.getElementById('benjaminStatement');
      // Viewport 1: 0-0.20 statement
      if (p < 0.20) {
        if (stmt) stmt.style.opacity = '1';
        if (stmtTitle) {
          const mask = Math.min(100, (p / 0.12) * 100);
          stmtTitle.style.clipPath = `polygon(0 0, ${mask}% 0, ${mask}% 100%, 0 100%)`;
        }
        if (stmtMeta) {
          stmtMeta.style.opacity = p > 0.12 ? '1' : '0';
          stmtMeta.style.transform = p > 0.12 ? 'translateY(0)' : 'translateY(12px)';
        }
        if (benCanvas) benCanvas.classList.remove('is-active');
        if (benQuote) benQuote.classList.remove('is-active');
        if (benCta) benCta.classList.remove('is-active');
      } else if (p < 0.55) {
        if (stmt) stmt.style.opacity = '0';
        if (benCanvas) benCanvas.classList.add('is-active');
        if (benQuote) benQuote.classList.remove('is-active');
        if (benCta) benCta.classList.remove('is-active');
        const local = (p - 0.20) / 0.35;
        if (benImg) {
          const inset = 10 * (1 - local);
          benImg.style.clipPath = `inset(${inset}% ${inset+2}% ${inset}% ${inset+2}%)`;
          benImg.style.objectPosition = `${70 - 20*local}% ${30 + 20*local}%`;
        }
        const step = Math.min(3, Math.floor(local * 4));
        benItems.forEach((el, i) => el.classList.toggle('is-active', i === step));
      } else if (p < 0.80) {
        if (stmt) stmt.style.opacity = '0';
        if (benCanvas) benCanvas.classList.remove('is-active');
        if (benQuote) benQuote.classList.add('is-active');
        if (benCta) benCta.classList.remove('is-active');
      } else {
        if (stmt) stmt.style.opacity = '0';
        if (benCanvas) benCanvas.classList.remove('is-active');
        if (benQuote) benQuote.classList.remove('is-active');
        if (benCta) benCta.classList.add('is-active');
      }
    }"""
    t = t.replace(old, new)
    p.write_text(t, encoding="utf-8")
    print("replaced")
else:
    print("not found")
    # debug: find any function updateBenjamin
    idx = t.find("function updateBenjamin")
    print(t[max(0,idx-200):idx+1000][:2000] if idx!=-1 else "no idx")
