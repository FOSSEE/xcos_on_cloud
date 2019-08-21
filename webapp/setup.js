var finalIntegrationTime = 1.0E05;
var integratorAbsoluteTolerance = 1.0E-06;
var integratorRelativeTolerance = 1.0E-06;
var maximumStepSize = 0.0E00;
var realTimeScaling = 0.0E00;
var toleranceOnTime = 1.0E-10;
var maxIntegrationTimeInterval = 1.00001E05;
var solver = 0.0;
var defaultProperties = null;

var expressionArray = [];

var solver_kind_array = ["LSodar", "Sundials/CVODE - BDF - NEWTON",
    "Sundials/CVODE - BDF - FUNCTIONAL",
    "Sundials/CVODE - ADAMS - NEWTON",
    "Sundials/CVODE - ADAMS - FUNCTIONAL",
    "DOPRI5 - Dormand-Prince 4(5)",
    "RK45 - Runge-Kutta 4(5)",
    "Implicit RK45 - Implicit Runge-Kutta 4(5)",
    "CRANI - Crank-Nicolson 2(3)",
    "Sundials/IDA",
    "DDaskr - Newton",
    "DDaskr - GMRes"
];

function setup() {
    var method = arguments[0];
    if (method == "get") {
        defaultProperties = {
            i_time: ["Final Integration Time", "finalIntegrationTime", finalIntegrationTime],
            ab_tolerance: ["Integrator Absolute Tolerance", "integratorAbsoluteTolerance", integratorAbsoluteTolerance],
            rl_tolerance: ["Integrator Relative Tolerance", "integratorRelativeTolerance", integratorRelativeTolerance],
            max_step_sze: ["Maximum step size(0 means no limit)", "maximumStepSize", maximumStepSize],
            rt_scale: ["Real Time Scaling", "realTimeScaling", realTimeScaling],
            tm_tolerance: ["Tolerance on Time", "toleranceOnTime", toleranceOnTime],
            max_integ_time_interval: ["Maximum Integration Time Interval", "maxIntegrationTimeInterval", maxIntegrationTimeInterval],
            solv_kind: ["Solver Kind", "solver", solver]
        };
        return defaultProperties;
    } else if (method == "set") {
        var setup_values = arguments[1];
        for (var prop in setup_values) {
            // Eliminate null values
            if (setup_values[prop] == null || setup_values[prop].length == 0)
                setup_values[prop] = 0.1;
            // Convert parameters from String to float
            setup_values[prop] = parseFloat(setup_values[prop]);
        }

        var properties = setup_values;
        for (key in properties) {
            window[key] = properties[key];
        }
    } else if (method == "getArray") {
        return solver_kind_array;
    }
}

function handleContext() {
    var method = arguments[0];
    if (method == "get") {
        return expressionArray;
    } else if (method == "set") {
        expressionArray = [];
        var contextValues = arguments[1];
        for (var prop in contextValues) {
                // Eliminate null values
            if (contextValues[prop] == null || contextValues[prop].length == 0){
                expressionArray[prop] = "";
            }else{
                expressionArray[prop] = contextValues[prop];
            }
        }
    }
}
