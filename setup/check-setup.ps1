$ErrorActionPreference = "SilentlyContinue"
$ok = $true

function Check-Command($Label, $Command) {
    if (Get-Command $Command -ErrorAction SilentlyContinue) {
        Write-Host "OK   $Label"
    } else {
        Write-Host "MISS $Label"
        $script:ok = $false
    }
}

Check-Command "Git" "git"
Check-Command "GitHub CLI" "gh"

if (Get-Command gh -ErrorAction SilentlyContinue) {
    gh auth status *> $null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK   GitHub authentication"
    } else {
        Write-Host "MISS GitHub authentication (run: gh auth login --web)"
        $ok = $false
    }
}

$name = git config --global user.name
$email = git config --global user.email

if ($name) {
    Write-Host "OK   Git name: $name"
} else {
    Write-Host "MISS Git name"
    $ok = $false
}

if ($email) {
    Write-Host "OK   Git email configured"
} else {
    Write-Host "MISS Git email"
    $ok = $false
}

if ($ok) {
    Write-Host ""
    Write-Host "READY: this computer is prepared for Kakkoi School Git/GitHub work."
    exit 0
}

Write-Host ""
Write-Host "NOT READY: follow setup/README.md for the missing items."
exit 1
