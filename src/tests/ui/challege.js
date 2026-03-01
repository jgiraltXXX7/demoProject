
//calculate the order total 

const order = [{name:"Phone", price:25000, qty:1},
               {name:"Charger", price:6000, qty:2}];


              function calculateOrderTotal(order){
                let total = 0;  
                for(let i=0; i<order.length; i++){
                  total += order[i].price * order[i].qty;
                } 
                return total;
              }

              const orderTotal = calculateOrderTotal(order);
              console.log(`Order Total: ${orderTotal}`); // Order Total: 29000

//conditional apply 13% disccount  if the total is greater than 30000
              function applyDiscountIfNeeded(total){
                if(total > 30000){
                  total -= total * 0.13;
                }
                return total;
              }
              const finalTotal = applyTaxIfNeeded(orderTotal);
              console.log(`Final Total: ${finalTotal}`); // Final Total: 29000



