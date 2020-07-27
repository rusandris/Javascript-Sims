function RK4d(sysDiffEq,init_cond,h){
  //create matrix that stores k values
  let kMatrix = new Array(4);
  for(i=0;i<4;i++){
    kMatrix[i] = Array(4);
  }
  
    // calc the k terms for each
  for(j=0;j<4;j++){
    switch(j) {
        //calculate k1 values
      case 0:{ 
        for(i=0;i<4;i++){
          kMatrix[i][j] = sysDiffEq(init_cond)[i];
        }
      }break;
      //calculate k2 and k3 values for each dynVar
      case 1:
      case 2:{
        let pluginValues = [];
        for(i=0;i<4;i++){
          pluginValues.push(init_cond[i]+h/2*kMatrix[i][j-1]);
        }
        for(i=0;i<4;i++){
          kMatrix[i][j] = sysDiffEq(pluginValues)[i];
        }
      } break;
        //calculate k4 values
      case 3: {
        let pluginValues = [];
        for(i=0;i<4;i++){
          pluginValues.push(init_cond[i]+h*kMatrix[i][j-1]);
        }
        for(i=0;i<4;i++){
          kMatrix[i][j] = sysDiffEq(pluginValues)[i];
        }
      } break; 
    }  
  }
    // calc the next step for each
    let nextStep = Array(4);
    
    for (i=0;i<4;i++){
      nextStep[i] = init_cond[i] + 1/6*h*(kMatrix[i][0]+2*kMatrix[i][0]+2*kMatrix[i][2]+ kMatrix[i][3]);
    }
  return nextStep;
}
//example of a system
function sysDiffEq(x){
  let dx = Array(4);
   dx[0] = x[0]+x[1];
   dx[1] = -x[1];
   dx[2] = x[2]-x[3];
   dx[3] = x[2];
  
  return dx
}
