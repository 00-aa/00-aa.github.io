  let LocalAllOrder = [],
  LocalAllOrderKey = [];
  for(let i = 0; i < localStorage.length; i++){
    let Key = localStorage.key(i);
    if(Key.slice(0,6) === 'Order_'){
      LocalAllOrder.push(JSON.parse(localStorage.getItem(Key)));
      LocalAllOrderKey.push(Key);
    }
  }
  
  LocalAllOrder.forEach((Order)=>{
    //console.log(`Name: ${Order.name}\nPrise: ${Order.prise}\nQua: ${Order.quantity}`);
    AddPro(Order);
  });
  
  //console.log(LocalAllOrder)
  
  
  
  function AddPro(ProObj={name: 'Unknown',icon: 'Unknown',prise: 'Unknown',quantity: 'Unknown'}){
    product_list_container.innerHTML += 
    `
      <div id="product_container">
        <div id="product">
          <div id="pro_icon_container">
            <img src="${ProObj.icon}">
          </div>
          <div id="pro_info_container">
            <span id="pro_name_container">Name: ${ProObj.name}</span>
            <span id="pro_prise_container">MRP: ${ProObj.prise}</span>
            <span id="pro_quantity_container">Qua: ${ProObj.quantity}</span>
          </div>
        </div>
      </div>
    `;
    
  }
  btn_order_all.onclick=()=>{
    LocalAllOrderKey.forEach((Key)=>{
      localStorage.removeItem(Key);
      location.reload();
    });
    confirm('Order Placed');
  }
  