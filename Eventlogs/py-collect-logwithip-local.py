import subprocess
import os

def run_powershell_script(script_name):
    try:
        # Get the current directory
        current_directory = os.path.dirname(os.path.abspath(__file__))
        
        # Construct the full path to the PowerShell script
        script_path = os.path.join(current_directory, script_name)
        
        # Run PowerShell script
        subprocess.run(["powershell.exe", "-File", script_path], check=True)
        print("PowerShell script executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        print("PowerShell script execution failed.")

if __name__ == "__main__":
    # Specify the name of your PowerShell script
    script_name = "ExportSystemEventLog.ps1"

    # Call the function with the script name
    run_powershell_script(script_name)
