


class DisplayLogic{
    #products=[];
    #department_check=[]
    #res=[]
    modify_btn=[]
    state=[]
   
    constructor(){
         this.#products = [{RowId:'Row-00',ProductId:'Prd-01', ProductName:'Laptop', CategoryName:'ECT', Price:10000},
                        {RowId:'Row-01',ProductId:'Prd-02', ProductName:'Mouse', CategoryName:'ECT', Price:5000},
                        {RowId:'Row-02',ProductId:'Prd-03', ProductName:'Monitor', CategoryName:'ECT', Price:2500},
                        {RowId:'Row-03',ProductId:'Prd-04', ProductName:'Mobile', CategoryName:'ECT', Price:60000},
                        {RowId:'Row-04',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-05',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-06',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-07',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-08',ProductId:'Prd-02', ProductName:'Mouse', CategoryName:'ECT', Price:5000},
                        {RowId:'Row-09',ProductId:'Prd-03', ProductName:'Monitor', CategoryName:'ECT', Price:2500},
                        {RowId:'Row-10',ProductId:'Prd-04', ProductName:'Mobile', CategoryName:'ECT', Price:60000},
                        {RowId:'Row-11',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-12',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-13',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-14',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-15',ProductId:'Prd-02', ProductName:'Mouse', CategoryName:'ECT', Price:5000},
                        {RowId:'Row-16',ProductId:'Prd-03', ProductName:'Monitor', CategoryName:'ECT', Price:2500},
                        {RowId:'Row-17',ProductId:'Prd-04', ProductName:'Mobile', CategoryName:'ECT', Price:60000},
                        {RowId:'Row-18',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-19',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-20',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200},
                        {RowId:'Row-21',ProductId:'Prd-05', ProductName:'Chord', CategoryName:'ECT', Price:1200}];
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

        this.department_check= [{name: 'IT',id: 'it1',value: 1},
                                {name: 'FOOD',id: 'food1',value: 2},
                                {name: 'ELECTRONICS',id: 'ele1',value: 3},
                                {name: 'ECT',id:'ect1',value: 4}]

        

    }
    
    RowCount=(val)=>{
        
        this.state['rows']=val
        this.getTable()
    }
    
    pagination=(dataset,page,rows)=>{
         this.trimStart=(page-1)*rows
         this.trimEnd=parseInt(this.trimStart) + parseInt(rows)
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
        //console.log(this.state['state'])
        
        this.getTable()
        
    }
    
    getTable=()=>{
        document.getElementById('display_tbl').innerHTML=''
        document.getElementById('pagination_div').innerHTML=''
        
        //console.log(this.state['data'])
        //console.log(this.state['state'])
        //console.log(this.state['rows'])
        this.#products=this.pagination(this.state['data'],this.state['state'],this.state['rows'])
        
        document.getElementById('display_tbl').innerHTML=this.objgen.ShowAllData(this.#products['dataset'],this.PageSize,this.CanDelete,this.CanEdit,this.CheckBox)       
        this.pageButtons(this.#products['noPages'])
        
    }     
  
    getCheckBox=()=>{
        document.getElementById('checkBoxList').innerHTML=this.objgen.chekBoxGenerator(this.department_check)

    }

    getForm=(val)=>{
        document.getElementById('Auto_form').innerHTML=this.objgen.FormGenerator(val)
        

    }
  
}//class ends







 loadData=()=>{  
    getRow=(val)=>{
        pobj.RowCount(val)
    }

    let formFields=[{Productid:8,ProductName:'Laptop',Manu_date:'20/02/2019'}]
    pobj = new DisplayLogic
    pobj.getTable()
    pobj.getCheckBox()
    pobj.getForm(formFields)
   
}
    