function Euler(sysDiffEq,init_cond,h){
	dim = init_cond.length; //dimension of the system 
	nextStep  = Array(dim);
	for(i=0;i<dim;i++){
		nextStep[i] = init_cond[i] + sysDiffEq(init_cond)[i]*h
	}
	return nextStep;
}
