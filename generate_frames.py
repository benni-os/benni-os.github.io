import os
import subprocess
import re

print("=== BENNI OS - FRAME GENERATOR ===\n")

# 1. Verificar video source
video_file = None
for f in ['benni-os-hero-source.mp4', 'hero-web.mp4']:
    if os.path.exists(f):
        video_file = f
        print(f"✓ Video encontrado: {f} ({os.path.getsize(f) / (1024*1024):.1f} MB)")
        break

if not video_file:
    print("❌ NENHUM video .mp4 encontrado na pasta!")
    print("   Mova o benni-os-hero-source.mp4 para esta pasta e rode novamente.")
    exit(1)

# 2. Criar pastas
os.makedirs('frames/hero', exist_ok=True)
os.makedirs('frames/hero-mobile', exist_ok=True)
print("✓ Pastas criadas: frames/hero, frames/hero-mobile")

# 3. Verificar quantos frames já existem
existing = [f for f in os.listdir('frames/hero') if f.startswith('frame-') and f.endswith('.webp')]
print(f"✓ Frames existentes: {len(existing)}")

if len(existing) < 900:
    print(f"\n⚠ Apenas {len(existing)} frames. Precisa de ~960.")
    print("  Gerando frames... (pode levar 2-3 minutos)\n")
    
    # Desktop: 12fps, 960 frames, 1280px wide
    cmd_desktop = [
        'ffmpeg', '-i', video_file,
        '-vf', 'fps=12,scale=1280:-2',
        '-c:v', 'libwebp',
        '-quality', '72',
        '-y',  # overwrite
        'frames/hero/frame-%04d.webp'
    ]
    
    result = subprocess.run(cmd_desktop, capture_output=True, text=True)
    
    if result.returncode == 0:
        new_frames = [f for f in os.listdir('frames/hero') if f.startswith('frame-') and f.endswith('.webp')]
        print(f"✓ {len(new_frames)} frames gerados em frames/hero/")
    else:
        print(f"❌ Erro ao gerar frames:")
        print(result.stderr)
        exit(1)
    
    # Mobile: 12fps, 240 frames, 640px wide (optimização)
    print("\nGerando frames mobile...")
    cmd_mobile = [
        'ffmpeg', '-i', video_file,
        '-vf', 'fps=12,scale=640:-2',
        '-frames:v', '240',  # Apenas primeiros 20s para mobile
        '-c:v', 'libwebp',
        '-quality', '60',
        '-y',
        'frames/hero-mobile/frame-%04d.webp'
    ]
    
    result = subprocess.run(cmd_mobile, capture_output=True, text=True)
    if result.returncode == 0:
        mobile_frames = [f for f in os.listdir('frames/hero-mobile') if f.startswith('frame-') and f.endswith('.webp')]
        print(f"✓ {len(mobile_frames)} frames gerados em frames/hero-mobile/")
    else:
        print("⚠ Mobile frames falharam, mas desktop está OK")

# 4. Verificar index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

if 'FRAME_COUNT' in html:
    print("\n✓ FRAME_COUNT encontrado no runtime")
else:
    print("\n⚠ FRAME_COUNT não encontrado - injetando...")
    # Adicionar FRAME_COUNT no início do runtime
    inject_point = html.find('const isMobile = window.innerWidth <= 768;')
    if inject_point != -1:
        inject_code = 'const FRAME_COUNT = isMobile ? 240 : 960;\n  '
        html = html[:inject_point] + inject_code + html[inject_point:]
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("✓ FRAME_COUNT injetado")

print("\n=== VERIFICAÇÃO FINAL ===")
hero_count = len([f for f in os.listdir('frames/hero') if f.endswith('.webp')])
mobile_count = len([f for f in os.listdir('frames/hero-mobile') if f.endswith('.webp')]) if os.path.exists('frames/hero-mobile') else 0

print(f"Desktop frames: {hero_count} / 960")
print(f"Mobile frames: {mobile_count} / 240")

if hero_count >= 900:
    print("\n✓✓✓ FRAMES PRONTOS ✓✓✓")
    print("\nPRÓXIMO PASSO:")
    print("  1. Abra: python -m http.server 8001")
    print("  2. Navegue para: http://localhost:8001")
    print("  3. Pressione Ctrl+Shift+R (hard reload)")
    print("  4. O hero deve funcionar agora!")
else:
    print(f"\n❌ Frames insuficientes. Rode este script novamente.")
