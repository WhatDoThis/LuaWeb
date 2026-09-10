# verify-routes.ps1 — 정적 export 전 라우트 HTTP·HTML 스모크 검증
param(
    [string]$BaseUrl = "http://localhost:3000",
    [switch]$UseStaticOut
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$routes = @(
    "/ko/",
    "/en/",
    "/ko/company/greeting/",
    "/en/company/greeting/",
    "/ko/company/overview/",
    "/en/company/overview/",
    "/ko/company/certificates/",
    "/en/company/certificates/",
    "/ko/company/location/",
    "/en/company/location/",
    "/ko/technology/tech-1/",
    "/en/technology/tech-1/",
    "/ko/technology/tech-2/",
    "/en/technology/tech-2/",
    "/ko/management/policy/",
    "/en/management/policy/",
    "/ko/pr-center/news/",
    "/en/pr-center/news/",
    "/ko/pr-center/news/website-renewal/",
    "/en/pr-center/news/website-renewal/",
    "/ko/pr-center/disclosure/",
    "/en/pr-center/disclosure/"
)

$failures = @()
$passed = 0

Write-Host "LuaWeb route verification — BaseUrl: $BaseUrl"

foreach ($route in $routes) {
    $url = "$BaseUrl$route"
    try {
        if ($UseStaticOut) {
            $filePath = Join-Path $root "apps/web/out$($route -replace '/$','/index.html' -replace '/$','')"
            if ($route -eq "/ko/") { $filePath = Join-Path $root "apps/web/out/ko/index.html" }
            if (-not (Test-Path $filePath)) {
                throw "Missing static file: $filePath"
            }
            $html = Get-Content -Path $filePath -Raw -Encoding UTF8
            $status = 200
        }
        else {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15
            $status = [int]$response.StatusCode
            $html = $response.Content
        }

        if ($status -ne 200) {
            throw "HTTP $status"
        }

        if ($html -match 'break-all') {
            throw "Found break-all in HTML"
        }

        if ($route -match '^/ko/' -and $html -notmatch 'ryu\.jinwoo@luacorp\.co\.kr') {
            throw "Footer email missing on KO route"
        }

        if ($html -match 'lua-nav-link[^>]*>[^<]*</a>\s*<a[^>]*lua-nav-link[^>]*>[^<]{1}</a>') {
            throw "GNB may have single-character link fragments"
        }

        Write-Host "[OK] $route"
        $passed++
    }
    catch {
        Write-Host "[FAIL] $route — $($_.Exception.Message)"
        $failures += "$route : $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "Result: $passed/$($routes.Count) passed"

if ($failures.Count -gt 0) {
    Write-Host "Failures:"
    $failures | ForEach-Object { Write-Host "  $_" }
    exit 1
}

exit 0
