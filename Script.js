let empanadas=0;
let boost=1;
let empanadaIndex=0;
let rebirth=0;
let rebirthNeeded=100000;
let rebirthMultiplier=1.0;

const empanadaCount=document.getElementById('empanada-count');
const empanadaImg=document.getElementById('empanada-img');
const empanadaName=document.getElementById('empanada-name');
const empanadaDesc=document.getElementById('empanada-desc');
const empanadasUl=document.getElementById('empanadas-ul');
const shopItemsDiv=document.getElementById('shop-items');
const upgradesDiv=document.getElementById('upgrades');
const rebirthCount=document.getElementById('rebirth-count');
const rebirthNeededSpan=document.getElementById('rebirth-needed');

// Empanadas
const empanadasList=[
{name:"Empanada tradicional", desc:"Clásica empanada con sabor casero", image:"images/empanada1.png", unlockAt:0, multiplier:0},
{name:"Empanada de Queso", desc:"Rellena de queso fundido", image:"images/empanada2.png", unlockAt:5000, multiplier:1.0},
{name:"Empanada de Carne", desc:"Carne jugosa con especias", image:"images/empanada3.png", unlockAt:15000, multiplier:1.5},
{name:"Empanada de Pollo", desc:"Pollo suave y sazonado", image:"images/empanada4.png", unlockAt:40000, multiplier:1.5},
{name:"Empanada de Pollo BBQ", desc:"Pollo con salsa BBQ casera", image:"images/empanada5.png", unlockAt:100000, multiplier:2.0},
{name:"Empanada Jamón y Queso", desc:"Jamón y queso clásico", image:"images/empanada6.png", unlockAt:200000, multiplier:2.0},
{name:"Empanada Pollo Picante", desc:"Pollo con toque picante", image:"images/empanada7.png", unlockAt:4000000, multiplier:2.5},
{name:"Empanada Pizza", desc:"Tomate, queso y pepperoni", image:"images/empanada8.png", unlockAt:7000000, multiplier:2.5},
{name:"Empanada MoraAmari", desc:"Dulce de mora y crema", image:"images/empanada9.png", unlockAt:120000000, multiplier:3.0},
{name:"Empanada MísticaAzul", desc:"Relleno misterioso azul", image:"images/empanada10.png", unlockAt:2000000000, multiplier:5.0}

// Ingredientes
const shopItems=[
{name:"Salsa básica", desc:"Salsa casera simple", cost:50, boost:2, unlock:0},
{name:"Queso extra", desc:"Extra de queso fundido", cost:150, boost:3, unlock:1},
{name:"Chile", desc:"Toque picante", cost:300, boost:4, unlock:2},
{name:"Salsa BBQ", desc:"Salsa BBQ dulce", cost:500, boost:5, unlock:3},
{name:"Mayonesa especial", desc:"Toque secreto", cost:800, boost:6, unlock:4},
{name:"Salsa secreta", desc:"Potente y misteriosa", cost:1200, boost:8, unlock:5},
{name:"Queso triple", desc:"Triple queso", cost:2000, boost:10, unlock:6},
{name:"Salsa de ajo", desc:"Ajo intenso", cost:3000, boost:12, unlock:7},
{name:"Salsa picante", desc:"Extra picante", cost:4500, boost:15, unlock:8},
{name:"Extra relleno", desc:"Más relleno", cost:6000, boost:20, unlock:9}
];

// Mejoras
const upgrades=[
{name:"Velocidad x2", cost:200, multiplier:2},
{name:"Ayudante x3", cost:500, multiplier:3},
{name:"Doble click", cost:1000, multiplier:2},
{name:"Horno exprés", cost:2000, multiplier:2},
{name:"Auto-click 3s", cost:3000, multiplier:1.5},
{name:"Multiplicador x2", cost:4000, multiplier:2},
{name:"Super ayudante", cost:5000, multiplier:3},
{name:"Click instantáneo", cost:6000, multiplier:2.5}
];

empanadaImg.src=empanadasList[0].image;

function renderShop(){
    shopItemsDiv.innerHTML='';
    shopItems.forEach((item,i)=>{
        const btn=document.createElement('button');
        btn.textContent=`${item.name}: ${item.desc} (x${item.boost}) Costo: ${item.cost}`;
        btn.disabled = i>0 && !shopItems[i-1].bought;
        btn.className = btn.disabled?"shop-item locked":"shop-item";
        btn.onclick = ()=>{
            if(empanadas>=item.cost){
                empanadas-=item.cost;
                boost*=item.boost;
                item.bought=true;
                item.cost = Math.floor(item.cost*1.5);
                updateDisplay();
                renderShop();
            } else alert("No tienes suficientes empanadas!");
        }
        shopItemsDiv.appendChild(btn);
    });
}

function renderUpgrades(){
    upgradesDiv.innerHTML='';
    upgrades.forEach(u=>{
        const btn=document.createElement('button');
        btn.textContent=`${u.name} (Costo: ${u.cost})`;
        btn.onclick = ()=>{
            if(empanadas>=u.cost){
                empanadas-=u.cost;
                boost*=u.multiplier;
                u.cost = Math.floor(u.cost*1.5);
                updateDisplay();
                renderUpgrades();
            } else alert("No tienes suficientes empanadas!");
        }
        upgradesDiv.appendChild(btn);
    });
}

document.getElementById('click-empanada').onclick = ()=>{
    empanadas += boost*rebirthMultiplier;
    checkEmpanadas();
    updateDisplay();
}

function checkEmpanadas(){
    if(empanadaIndex<empanadasList.length && empanadas>=empanadasList[empanadaIndex].unlockAt){
        let li=document.createElement('li');
        li.textContent=empanadasList[empanadaIndex].name+" desbloqueada!";
        empanadasUl.appendChild(li);
        empanadaImg.src=empanadasList[empanadaIndex].image;
        empanadaName.textContent=empanadasList[empanadaIndex].name;
        empanadaDesc.textContent=empanadasList[empanadaIndex].desc;
        boost += empanadasList[empanadaIndex].multiplier;
        empanadaIndex++;
    }
}

function renacer(){
    if(empanadas>=rebirthNeeded){
        rebirth++;
        rebirthMultiplier = 2 + rebirth*0.5;
        empanadas=0;
        boost=1;
        empanadaIndex=0;
        empanadasUl.innerHTML='';
        rebirthNeeded = Math.floor(rebirthNeeded * 2.5);
        alert(`✨ Renaciste! Multiplicador de ganancias x${rebirthMultiplier.toFixed(1)} ✨`);
        rebirthCount.textContent=rebirth;
        updateDisplay();
    } else alert(`Necesitas ${rebirthNeeded} empanadas para renacer!`);
}