function Euler(sysDiffEq,init_cond,h){ //last element of init_cond is time
	dim = init_cond.length; //dimension of the system 
	nextStep  = Array(dim);
	for(i=0;i<dim;i++){
		nextStep[i] = init_cond[i] + sysDiffEq(init_cond)[i]*h
	}
	t += 1;
	return nextStep;
}
