# Retrieve all events from the System event log
#PowerShell Script
$events = Get-WinEvent -LogName System

# Define the path to the folder
$folderPath = "C:\Eventlogs"

# Check if the folder exists, if not, create it
if (-not (Test-Path -Path $folderPath)) {
    New-Item -Path $folderPath -ItemType Directory -Force
}

# Get the IP address of the machine
$ip = (Test-Connection -ComputerName (hostname) -Count 1).IPv4Address.IPAddressToString

# Export events to CSV file and rename it with the IP address
$events | Export-Csv -Path "$folderPath\$ip.csv" -NoTypeInformation
