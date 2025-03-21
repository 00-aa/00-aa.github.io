  
  for (let i = 0; i < 20; i++){
    AddPro({
      name: 'Nissan Gtr'+i,
      icon: '/DEMO/0.jpeg',
      prise: '$ 2,20,00,00 (2.2 cr)',
      description: 'des: hello world cup and informal and location of buttons on road price hi nahi hai 😅',
      pic: ['/DEMO/0.jpeg','/DEMO/1.jpeg','/DEMO/2.jpeg','/DEMO/3.jpeg','/DEMO/0.jpeg','/DEMO/1.jpeg','/DEMO/2.jpeg','/DEMO/3.jpeg']
    });
  }
  
  function AddPro(ProObj={name: 'Unknown',icon: 'Unknown',prise: 'Unknown',description: 'Unknown',pic: []}){
    let Pictures = '';
    ProObj.pic.forEach((picurl)=>{
      Pictures += '<img src="'+picurl+'">'
    });
    main.innerHTML += 
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
              <button>Buy</button>
              <button>Help</button>
              <button>Contact</button>
            </div>
          </div>
        </div>
      </div>
    `
  }
  
  
  
  
  