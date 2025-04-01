  import { IsAdmin, OnChildAdded, Create, Delet, RandomPath } from '/firebase.js';
  IsAdmin().then((res)=>{
    if(res){
      Init();
      INP_FILE_BANNERS.style.display = 'grid';
    }else{
      location = "/HOME/index.html"
      confirm('You Are Not An Admin!');
    }
  });
  
  function Init(){
    OnChildAdded('APP/BANNERS',(BannerImgData)=>{
      let Banner = BannerImgData.val();
      banners_container.innerHTML += `
        <div id="${BannerImgData.key}">
          <img src="${Banner.ImageUrl}">
          <button onclick="RemoveBanner(this.name)" name="${BannerImgData.key}">Delet</button>
        </div>
      `;
    });
    
    window.RemoveBanner = (BannerId)=>{
      if(confirm('Are You Sure You Want To Remove This Banner')){
        Delet('APP/BANNERS/'+BannerId).then(()=>{
          document.getElementById(BannerId).remove();
        })
      }
    }
    
    window.UplodBanner = (Inp)=>{
      let FilesFromUser = Inp.files;
      
      if(FilesFromUser[0]){
        for(let i = 0; i < FilesFromUser.length; i++){
          const FileObj = FilesFromUser[i];
          console.log(FileObj);
          if(FileObj.size < 1024 * 1024){
            const UserFileReader = new FileReader();
            UserFileReader.readAsDataURL(FileObj);
            
            UserFileReader.onload = async (e)=>{
              let FileStrUrl = UserFileReader.result;
              let FileUid = await RandomPath('APP/BANNERS/');
              
              Create('APP/BANNERS/'+FileUid,{
                ImageUrl: FileStrUrl,
                TimeStamp: Date.now()
              });
              
            };
          }else{
            confirm('File Not Uploded: Filesize greater then 1MB');
          }
        }
      }else{
        confirm('File Not Uploded: No File Selected');
      }
    }
  }