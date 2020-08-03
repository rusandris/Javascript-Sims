# ODE solvers for Javascript-Sims
Documentation of ODE solvers written for the JS simulation project of [ThePhysHub](https://github.com/ThePhysHub/ThePhysicsHub) team.
## Usage
This is not a library yet, since there are 3 solvers at the moment, which still can be optimized and developed, but if the number of solvers and features grow, they can be worked into a mini-library.  
**You can use the solvers by copying the solver function and calling it on your system.**   
**All solvers use the p5.js draw() function loop, so you don't have to implement them inside a user defined loop. All of them work the same way: the solvers return the next timestep that replaces(updates) the values in the dynamical variables container array defined by the user.**
## Declaring ODE systems  
Both the *Euler* and *RK* solvers require that the system of differential equations are written in first order form: ![SysDiffEq](https://github.com/rusandris/Javascript-Sims/blob/master/CodeCogsEqn.pdf)  
For autonomous systems this would look something like this in code:  

```
function sysDiffEq(x){
  let dx = Array(3); // make a container array of size d (dimension of the system)
   dx[0] = 10*(x[1]-x[0]);
   dx[1] = x[0]*(28-x[2]) - x[1];
   dx[2] = x[0]*x[1] - 8/3*x[2];
  return dx
}

```
For the *VelocityVerlet* solver, it is the same, but the algorithm assumes a particular ordering: for each coordinate, first the derivative of generalized velocity, then comes the derivative of the corresponding generalized coordinate:   
```
function sysDiffEq(x){
  let dx = Array(4); 
   dx[0] = -g/l*x[1];
   dx[1] = x[0];
   dx[2] = //some other function here
   dx[3] = x[2];
  return dx
}

```
