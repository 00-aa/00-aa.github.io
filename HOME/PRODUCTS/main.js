  
  for(let i = 0; i < 30; i++){
    AddPro({
      name: 'Nissan Gtr '+i,
      icon: '/DEMO/0.jpeg',
      prise: '$ 2,20,00,00 (2.2 cr)',
      description: 'des: The Nissan GT-R, often nicknamed "Godzilla," is a high-performance, luxury sports car known for its powerful engine, all-wheel drive, and exceptional acceleration, designed for both grand touring and racing.',
      pic: ['/DEMO/0.jpeg','/DEMO/1.jpeg','/DEMO/2.jpeg','/DEMO/3.jpeg','/DEMO/0.jpeg','/DEMO/1.jpeg','/DEMO/2.jpeg','/DEMO/3.jpeg']
    });
  }
  
  function AddPro(ProObj={name: 'Unknown',icon: 'Unknown',prise: 'Unknown',description: 'Unknown',pic: []}){
    let Pictures = '';
    ProObj.pic.forEach((picurl)=>{
      Pictures += '<img src="'+picurl+'">'
    });
    product_list_container.innerHTML += 
    `
      <div id="product_container">
        <div id="product">
          <div id="product_basic_info_container">
            <div id="icon_container">
              <img src="${String(ProObj.icon)}">
            </div>
            <div id="info_container">
              <span id="product_name">
                ${String(ProObj.name)}
              </span>
              <span id="produck_prise">
                ${String(ProObj.prise)}
              </span>
            </div>
          </div>
          <div id="product_detail_info_container">
            <div id="product_discription_container">
              ${String(ProObj.description)}
            </div>
            <div id="product_img_container">
              ${String(Pictures)}
            </div>
            <div id="product_opt_container">
              <form onsubmit="StrToObj(this.getAttribute('data'),this.inp.value);this.inp.value=null;return false;" data='${JSON.stringify(ProObj)}'>
                <label for="inp_product_quantity">Qua: <input name="inp" type="number" id="inp_product_quantity" min="1" max="100" required></label>
                <button type="submit">Add to Cart</button>
              </form>
              <button>Help</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
  }
  
  
  
  window.StrToObj = (ProData,ProQua)=>{
    let OrderProObj = JSON.parse(ProData);
    OrderProObj.quantity = Number(ProQua);
    OrderProObj.orderplacedon = Date.now();
    OrderProObj.id = 'Order_'+(Date.now()*Math.floor(Math.random()*999999)).toString(32);
    delete OrderProObj.description;
    delete OrderProObj.pic;
    
    let ObjStr = JSON.stringify(OrderProObj);
    localStorage.setItem(OrderProObj.id,ObjStr);
    
    confirm('Order Added to Cart! 🛒');
  }