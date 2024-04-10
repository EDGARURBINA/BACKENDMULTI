 class Tip {
    constructor(numeroActualTip) {
       this.numeroActualTip = numeroActualTip;
     }
  
     // Funciones
     cambiarTip() {
     // Cada 3 semanas
       if (this.numeroActualTip === 48)
         this.numeroActualTip = 1;
       else
         this.numeroActualTip += 1;
     }
  
     updateTip(newNumeroActualTip) {
       this.numeroActualTip = newNumeroActualTip;
     }
   }
  
 export const tip = new Tip(1);


 export default tip;
  
//  // tip.updateTip(tip.numeroActualTip + 1)
   



// // la variable tiene que estar en la api
// //update tip 
// //Fechas iniciales 



