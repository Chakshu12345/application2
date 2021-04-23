


class DisplayLogic{
    #products=[];
    #res=[]
    modify_btn=[]
    state=[]
   
    constructor(){
         this.#products = [{RowId:'Row-00',ProductId:'Prd-01', ProductName:'Laptop', CategoryName:'ECT', Price:10000},
                        {RowId:'Row-01',ProductId:'Prd-02', ProductName:'Mouse', CategoryName:'ECT', Price:5000},
                        {RowId:'Row-02',ProductId:'Prd-03', ProductName:'Monitor', CategoryName:'ECT', Price:2500},
                        {RowId:'Row-03',ProductId:'Prd-04', ProductName:'Mobile', CategoryName:'ECT', Price:60000},
                        {RowId:'Row-04',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-04',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-04',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-04',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200}];
         this.PageSize = 5
         this.CanDelete = true
         this.CanEdit = true
         this.CheckBox= true

         //this.#products.push({ProductId:1, ProductName:'Laptop', CategoryName:'ECT', Price:10000});
         this.objgen = new UIGenerator()

         this.state= {'data': this.#products,
         'state': 1,
         'rows': this.PageSize  
        
        }

        

    }
    
    
    pagination=(dataset,page,rows)=>{
         this.trimStart=(page-1)*rows
         //console.log(this.trimStart)
         this.trimEnd=this.trimStart + rows
         //console.log(this.trimEnd)
         this.trimdata=dataset.slice(this.trimStart,this.trimEnd)

        this.noPages=Math.ceil(dataset.length / rows);

        return{
            'dataset':this.trimdata,
            'noPages':this.noPages
        }

    }

    

    pageButtons =(pages)=>{
        
        let pagination_div=document.getElementById('pagination_div')
        for( let page=1; page<=pages ;page++){
            pagination_div.innerHTML+=`<button value=${page} class='page btn-sm btn-info' name='page'>${page}</button>`
        }

       let page_btn= document.getElementsByName('page')
      
        for(let i of page_btn){
            i.addEventListener('click',this.buttonClick,false)

        }
        
    }

    buttonClick=(e)=>{
                //console.log(this)
                document.getElementById('display_tbl').innerHTML=''
                document.getElementById('pagination_div').innerHTML=''
                
        this.state['state']=e.target.value
        //console.log(state)
        
        this.getTable()
        
    }
    
    getTable=()=>{
        //console.log(this.#products['noPages'])
        console.log('in data table')
        this.#products=this.pagination(this.state['data'],this.state['state'],this.state['rows'])
        //console.log(this.state['state'])
        document.getElementById('display_tbl').innerHTML=this.objgen.ShowAllData(this.#products['dataset'],this.PageSize,this.CanDelete,this.CanEdit,this.CheckBox)       
        this.pageButtons(this.#products['noPages'])
        
    }     
    

    
   
    // eventHandler=()=>{
    //     let edit_btn=document.getElementsByName('Edit_row')

    //     for(let row of edit_btn){
            
    //             row.addEventListener('click',function() {
                    
    //             let val=(this.value).split('-')
                
    //             let edit_cel=`cel-${this.value}`;
                
    //              for(let i=1;i<val[1];i++){

    //              let inp_id=`inp-${val[0]}-${i}`
    //              let span_id=`span-${val[0]}-${i}`

    //             // console.log(inp_id)
    //             // console.log(span_id)

    //              document.getElementById(span_id).style.display='none'
    //              document.getElementById(inp_id).style.display='block'
    //              document.getElementById(edit_cel).innerHTML=''
    //              document.getElementById(edit_cel).innerHTML=
    //             `<button  name='modify'>Save</button><button >Cancel</button>`
                
                
    //              }//inner for
        
    //              this.modify_btn=document.getElementsByName('modify')
    //                 console.log(this.modify_btn)
    //          },false);//event handler
    //     }

     
            
        
   // }
    
    
     
  

    
}//class ends



 loadData=()=>{  
    //console.log("Hi")
    pobj = new DisplayLogic
    
    pobj.getTable()
    //pobj.eventHandler()
   
}
    