import sys
import base64
import time
import os
import subprocess
import sys
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s: %(message)s',
    handlers=[
        logging.FileHandler('/tmp/generate_reel.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)


def uninstall(package):
    logger.info(f"Attempting to uninstall {package}")
    subprocess.check_call([
        sys.executable,
        "-m", "pip", "uninstall",
        "-y", # force uninstall
        package
    ])

# Install the package first
def install(package):
    subprocess.check_call([
        sys.executable,
        "-m", "pip", "install",
        "-q", # quiet mode
        "--no-warn-script-location",  # Suppress script location warnings
        package
    ])

uninstall('pix2reel')
install('git+https://github.com/talentedgeai/pix2reel.git')

def main():
    # Receive image paths as command-line arguments
    image_paths = sys.argv[1:-1]
    
    # Process images
    if not image_paths:
        print("No images provided. Using default processing.", flush=True)

    # Fake captions
    captions = []
    for path in image_paths:
        captions.append("Captions to be insert")
        if not os.path.exists(path):
            print(f"Image not found: {path}", flush=True)
    
    # Add audio
    audio_path = sys.argv[-1]
    
    # Generate video
    output_path = os.path.join(os.getcwd(), 'public', 'output_video.mp4')
    
    # Ensure the directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    try:
        import pix2reel
        pix2reel.run_reel_assembly(image_paths, captions, audio_path, output_video=output_path, mode='url')
        
    except Exception as e:
        print(f"Error generating video: {e}", flush=True)
        import traceback
        traceback.print_exc()
    
    # Output success message
    time.sleep(1)
    print("Congratulations! You have completed the challenge. Here is your journey!", flush=True)
    sys.stdout.flush()

if __name__ == "__main__":
    main()