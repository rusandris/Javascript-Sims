function RK(sysDiffEq,init_cond,h){
// dimensions of the system
	let dim = init_cond.length
//create matrix that stores k values (dimension of the system x 4)
	let kMatrix = Array(dim);
	for(i=0;i<dim;i++){
		kMatrix[i] = Array(4);
	}

	// calc the k terms for each
	for(j=0;j<4;j++){
		switch(j) {
		//calculate k1 values
		case 0:{ 
			for(i=0;i<dim;i++){
				kMatrix[i][j] = sysDiffEq(init_cond)[i]; //and plug them in the matrix
			}
	      	}break;
	      	
		case 1:
	      	case 2:{
			let pluginValues = [];
			for(i=0;i<dim;i++){
			pluginValues.push(init_cond[i]+h/2*kMatrix[i][j-1]); //calculate k2 or k3 values 
			}
			for(i=0;i<dim;i++){
			  kMatrix[i][j] = sysDiffEq(pluginValues)[i]; //store them in the matrix
			}
	      	}break;
	      	case 3: {
			let pluginValues = [];
			for(i=0;i<dim;i++){
			  pluginValues.push(init_cond[i]+h*kMatrix[i][j-1]); //calculate k4 values 
			}
			for(i=0;i<dim;i++){
			  kMatrix[i][j] = sysDiffEq(pluginValues)[i]; //store them in the matrix
			}
	       }break;
	       }
	}
	// calc the next step for each
	let nextStep = Array(dim);    
	for (i=0;i<dim;i++){
		nextStep[i] = init_cond[i] + 1/6*h*(kMatrix[i][0]+2*kMatrix[i][0]+2*kMatrix[i][2]+ kMatrix[i][3]); // RK formula
	}
  	return nextStep;
}

