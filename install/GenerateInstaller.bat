"C:\Program Files (x86)\WiX Toolset v3.11\bin\heat.exe" dir "src\PQ Dashboard" -cg PQDashboardFiles -dr PQDASHFOLDER -gg -sfrag -srd -sreg -var var.PQDashSource -out src\DashComponents.wxs
"C:\Program Files (x86)\WiX Toolset v3.11\bin\candle.exe" src\PQDashboard.wxs src\DashComponents.wxs "-dPQDashSource=src\PQ Dashboard" -ext "C:\Program Files (x86)\WiX Toolset v3.11\bin\WixIIsExtension.dll" -ext "C:\Program Files (x86)\WiX Toolset v3.11\bin\WixNetFxExtension.dll" -ext "C:\Program Files (x86)\WiX Toolset v3.11\bin\WixUIExtension.dll" -ext "C:\Program Files (x86)\WiX Toolset v3.11\bin\WixUtilExtension.dll" -out obj\
"C:\Program Files (x86)\WiX Toolset v3.11\bin\light.exe" obj\PQDashboard.wixobj obj\DashComponents.wixobj -ext "C:\Program Files (x86)\WiX Toolset v3.11\bin\WixIIsExtension.dll" -ext "C:\Program Files (x86)\WiX Toolset v3.11\bin\WixNetFxExtension.dll" -ext "C:\Program Files (x86)\WiX Toolset v3.11\bin\WixUIExtension.dll" -ext "C:\Program Files (x86)\WiX Toolset v3.11\bin\WixUtilExtension.dll" -out bin\PQDashboard.msi