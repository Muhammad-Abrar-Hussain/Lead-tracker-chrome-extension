let my_lead = []
let btnEle = document.querySelector("#input-btn")
const inputEle = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delEl = document.querySelector("#del-btn")
const tabBtn = document.getElementById("tab-btn")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("my_lead"))
if (leadsFromLocalStorage){
    my_lead = leadsFromLocalStorage
    render(my_lead)
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        my_lead.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(my_lead) )
        render(my_lead)
    })
})


function render(leads){
    let listItems = ""
    for(let i=0; i<leads.length; i++){
        //listItems += "<li><a href='+ my_lead[i] +' target = _blank>" +my_lead[i]+ "</a></li>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
ulEl.innerHTML = listItems
}

delEl.addEventListener("dblclick", function(){
    localStorage.clear()
    my_lead = []
    render(my_lead)
})

btnEle.addEventListener("click" , function(){
    my_lead.push(inputEle.value)
    inputEle.value = ""
    localStorage.setItem("myLeads", JSON.stringify(my_lead))
    render(my_lead)

})


