/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SONARQUBESTARTCMD: 'C:/Users/user/sonarqube/bin/windows/StartSonar.bat'
  }
}

module.exports = nextConfig
