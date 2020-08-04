# ODE solvers for Javascript-Sims
Documentation of ODE solvers written for the JS simulation project of [ThePhysHub](https://github.com/ThePhysHub/ThePhysicsHub) team.
## Usage
This is not a library yet, since there are 3 solvers at the moment, which still can be optimized and developed, but if the number of solvers and features grow, they can be worked into a mini-library.  
**You can use the solvers by copying the solver function and calling it on your system.**   

**All solvers use the p5.js draw() function loop, so you don't have to implement them inside a user defined loop. All of them work the same way: the solvers return the next timestep that replaces(updates) the values in the dynamical variables container array defined by the user.**
## Declaring ODE systems  
Both the *Euler* and *RK* solvers require that the system of differential equations are written in first order form: ![SysDiffEq form](https://github.com/rusandris/Javascript-Sims/blob/readme-edits/EulerRK_eqformat.pdf)  
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
For the *VelocityVerlet* solver, it is the same, but the algorithm assumes a particular ordering: for each coordinate, first the derivative of generalized velocity, then comes the derivative of the corresponding generalized coordinate: ![VelocityVerlet form](https://github.com/rusandris/Javascript-Sims/blob/readme-edits/velocityVerlet_eqformat.pdf)
In code:
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
## Important things to note
While RK is the most accurate of the 3 solvers, because it's a 4th order method (meaning that the truncation error after every step is proportional to the 5th power of the stepsize used), it's drawback is that it does not conserve quantities like mechanical energy. 

Since we are mostly going to be dealing with Hamiltonian systems (which do conserve energy -> phase space volume in general), there is the second order VelocityVerlet algorithm which does the job. In a nutshell, energy would be constant along solutions of the differential equations (at least as an average). You might ask how this is possible if that  solver is less accurate than RK. Well, this just means VelocityVerlet does get a less accurate solution than RK, but it doesn't deviate from it. RK solvers accumulate error over time that doesn't get compensated.  

Here are some snapshots of the phase space of a simple pendulum after a couple of iterations(Euler,RK and VV in order): ![Euler](https://github.com/rusandris/Javascript-Sims/blob/readme-edits/euler.png) ![RK](https://github.com/rusandris/Javascript-Sims/blob/readme-edits/RK.png), ![VelocityVerlet](https://github.com/rusandris/Javascript-Sims/blob/readme-edits/velocityVerlet.png)
