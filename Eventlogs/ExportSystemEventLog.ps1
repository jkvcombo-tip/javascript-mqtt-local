# Retrieve all events from the System event log
$events = Get-WinEvent -LogName System

# Define the path to the folder
$folderPath = "C:\Eventlogs"

# Check if the folder exists, if not, create it
if (-not (Test-Path -Path $folderPath)) {
    New-Item -Path $folderPath -ItemType Directory -Force
}

# Export events to CSV file
$events | Export-Csv -Path "$folderPath\SystemEventLog.csv" -NoTypeInformation