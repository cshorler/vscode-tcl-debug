#!/usr/bin/env tclsh

set debugVars(interp) "/usr/bin/tclsh"
set debugVars(dir) {}
set debugVars(script) "../../sampleWorkspace/hello.tcl"
set debugVars(scriptArgs) ""
set debugVars(projName) "vscode"
set startCmd "dbg::step"

source debugger.tcl
debugger::setDebugVars [array get debugVars]
debugger::init
debugger::start $startCmd
vwait forever
