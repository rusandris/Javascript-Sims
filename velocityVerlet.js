function velocityVerlet(sysDiffEq,init_cond,h){
	dim = init_cond.length;
	nextStep  = init_cond;
	for(i=0;i<dim;i+=2){
		nextStep[i] += 0.5*h*sysDiffEq(init_cond)[i] //adjusting velocity a half step for each
	}
	
	for(i=1;i<dim;i+=2){
		nextStep[i] +=  h*nextStep[i-1] //adjusting each position
	}
	
	for(i=0;i<dim;i+=2){
		nextStep[i] += 0.5*h*sysDiffEq(nextStep)[i] //finally readjusting the velocities 
	}
	
	return nextStep;
}
