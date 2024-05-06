import subprocess

def run_export_script():
    # Execute the batch file
    try:
        subprocess.run(["RunExportSystemEventLog.bat"], check=True)
        print("System event log exported successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_export_script()
