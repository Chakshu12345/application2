

class UIGenerator {
    #record=[]
    constructor(){
        
        
    }

   

     ShowAllData(data,PageSize,CanDelete,CanEdit,CheckBox){
        if(data === undefined){
            return '<div>Invalid Data Source</div>';
        }
        if(data.length === 0 ){
            return '<div>No Records</div>';
        }       
        var table="";
        // get all keys for the 0th record
        var headers = Object.keys(data[0]);
        table+= `<table  class='table table-bordered '>`;
        table += `<thead><tr>`
        //table+=`<th style='display:none'>Table Row</th>`
        for(var c=0;c<headers.length;c++){
            table+= `<th >${headers[c]}</th>`; 
        } 
        if(CanEdit== true)  
        table+=`<th>Edit</th>`

        if(CanDelete== true)  
        table+=`<th>Delete</th>`
        table+=`<th>Select All <input class="check-input" type="checkbox" value="" id="select_all" onClick="selectAll(this)"></th>`
        table+=`</tr></thead>`;
        table+=`<tbody>`;
        for(let row=0;row<data.length;row++){
            
            table+=`<tr value='' id=${row} >`;
            
            //table+= `<td value='tr-${row}' style='display:none'>tr-${row}</td>`
            table+= `<td value=${data[row][headers[0]]}  >${data[row][headers[0]]}</td>`
            for(var d=1;d<headers.length;d++){
                
                table+= `<td value=${data[row][headers[d]]}  >
                <span id='span-${row}-${d}'>${data[row][headers[d]]}</span> 
                <input type='text' value=${data[row][headers[d]]} id='inp-${row}-${d}' style='display:none'>
                </td>`; 
            }  
            //console.log(data)
            let data1=JSON.stringify(data)
            if(CanEdit== true)
            table+= `<td id='cel-${row}-${d}'><button class="btn btn-outline-success" id='E-${row}-${d}' onClick=ShowButtons(${data1},'${row}','${d}')>Edit</button></td>`

            if(CanDelete==true)
            table+= `<td><button class="btn btn-outline-danger" id='D-${row}-${d}' onClick='DeleteRow(${row},${data1})'>Delete</button></td>`


            table+=`<td id='check'><input class="check-input" type="checkbox" name="check" value="check-${row}-${d}" id="check-${row}-${d}"></td>`
            
            table+=`</tr>`;
            
        }
        
        table+="</tbody>";
        table+=`<tfoot id='pagi'><tr></tr></tfoot>`;
        table+="</table>";
      
        return table;
        //return table;

    }

    chekBoxGenerator=(val)=>{
        let chkbox=''
        for(let row of val){
                //console.log(row['name'])
                
                chkbox+=`<input  type='checkbox'id='${row['id']}' name='${row['name']}' value='${row['value']}'><label class="form-check-label" for="exampleCheck1">${row['name']}</label><br>`
        }
        
        return chkbox
    }

    FormGenerator=(data)=>{
        let label = Object.keys(data[0]);
        console.log(label)
        let form_fields=`<form>`;
            for(let l=0;l<label.length;l++){
                for(let d of data){
                form_fields+=`<br>`
                if(isNaN(d[label[l]])== false){
                    form_fields+=`<div class="form-group">`
                    form_fields+=`<label>${label[l]}</label>
                    <input type='number' value='' id='${label[l]}' class="form-control" style='width:10%'></div>`
                }
                if (typeof d[label[l]] === 'string') {
                    form_fields+=`<div class="form-group">`
                    form_fields+=`<label>${label[l]}</label>
                    <input type='text' value='' id='${label[l]}' class="form-control" style='width:40%'></div>`
                }
                if (is_date(d[label[l]]))
                {
                    console.log(d[label[l]])
                }
            } 
        }
        form_fields+=`<button  class="btn btn-success">Submit</button>`
        form_fields+=`</form>`;
        return form_fields;
    }
        
}

function selectAll(e)
{
    checkboxes = document.getElementsByName('check');
    if (e.checked) {
        for (var i = 0; i < checkboxes.length; i++) { 
          checkboxes[i].checked = true;
        }
      } else {
        for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = false;
        }
      }
    
}

function ShowButtons(data,val,val1)
{
    console.log(val)
//let row_col= document.getElementsByName('Edit_row').value
//console.log('Hi')
edit_cel=`cel-${val}-${val1}`
for( let i=1;i<val1;i++){
    inp_id=`inp-${val}-${i}`
    span_id=`span-${val}-${i}`
    
    //console.log(i)
    //console.log(inp_id)
    
    document.getElementById(span_id).style.display='none'
    document.getElementById(inp_id).style.display='block'
    document.getElementById(edit_cel).innerHTML=''
    document.getElementById(edit_cel).innerHTML=
    `<button onClick='modifyRow(${JSON.stringify(data)},${val},${val1})'>Save</button><button onClick=getRow(${val},${val1})>Cancel</button>`
   
}

}


function getRow(row,col)
{
    for(i=1;i<col;i++){
        span_id=`span-${row}-${i}`
        inp_id=`inp-${row}-${i}`
        edit_cel=`cel-${row}-${col}`
        
        document.getElementById(span_id).style.display='block'
        document.getElementById(inp_id).style.display='none'
        document.getElementById(edit_cel).innerHTML=
        `<button class="btn btn-outline-success" id='E-${row}-${col}' onClick=ShowButtons('${row}','${col}')>Edit</button>`
       
    }

} 

function modifyRow(data,row,col)
{

    //console.log(data)
    //console.log(col)
    let headers = Object.keys(data[0]);
    //console.log(headers)
        
            tbl_row_id=`Row-0${row}`
            
                for(let c=1;c<headers.length;c++){
                    span_id=`span-${row}-${c}`
                    inp_id=`inp-${row}-${c}`
                    let i=`${row}`
                    //console.log(data[i][headers[c]])
                    data[i][headers[c]]=document.getElementById(inp_id).value
                    document.getElementById(inp_id).style.display='none'
                    
                    document.getElementById(span_id).innerHTML=document.getElementById(inp_id).value
                    document.getElementById(span_id).style.display='block'
                    document.getElementById(edit_cel).innerHTML=''
                    document.getElementById(edit_cel).innerHTML=
        `<button class="btn btn-outline-success" id='E-${row}-${col}' onClick=ShowButtons(${JSON.stringify(data)},${row},${col})>Edit</button>`
                 
    }

    //console.log(data) 


}

function DeleteRow(row,data){
data.splice(row)
//console.log(data)
document.getElementById(row).innerHTML=''

}







