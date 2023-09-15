// ******** Lógica para actualizar el menú del navbar en todas las páginas

const items_nav = {
    Bootcamps:{
        OpenBootcamp: '/category/bootcamps/openBootcamp/',
        Laboratoria: '/category/bootcamps/laboratoria/',
        Henry: '/category/bootcamps/henry/'
    }
}

const items_nav_keys = Object.keys(items_nav)
const items_nav_Values = Object.values(items_nav)


const nav_container = document.getElementById('nav_container')
const fragment = document.createDocumentFragment()


Object.entries(items_nav).forEach( ([key, value]) => {

    const span = document.createElement('span')
    span.classList.add('nav_link')
    
    const span_child = document.createElement('span')

    span_child.classList.add('cursor-pointer','p-2')
    span_child.textContent = key
    
    // crear imagen-flecha
    const arrow_image = document.createElement('img')
    arrow_image.classList.add('inline-block', 'arrow-nav', 'ml-[5px]')
    // arrow_image.setAttribute('src', './img/🦆 icon _chevron-down_.svg')
    arrow_image.setAttribute('src', 'https://res.cloudinary.com/dzcvicnlw/image/upload/v1694742846/nexdex/arrow.svg')
    arrow_image.setAttribute('alt', 'arrow')

    span_child.appendChild(arrow_image)
    span.appendChild(span_child)  // se agrega primer hijo


    // crear div - segundo elemento hijo
    const div = document.createElement('div')
    div.classList.add('flex', 'gap-2', 'flex-col', 'bg-lime-200', 'p-2', 'rounded-lg', 'absolute', 'top-[65px]', 'nav_select_bootcamp', 'hidden')

    // iterando para añadir los valores de los item_nav
    Object.entries(value).forEach(([key, value]) =>{
        const span = document.createElement('span')
        span.classList.add('hover:bg-lime-500', 'rounded-lg', 'p-1')
        
        const a = document.createElement('a')
        a.setAttribute('href', value)
        a.textContent = key

        span.appendChild(a)
        div.appendChild(span)
    })

    span.appendChild(div)    //se agrega segundo hijo
    
    fragment.appendChild(span)
})

nav_container.appendChild(fragment)



// ******** Lógica para abrir el navbar

const nav_selects = document.querySelectorAll('.nav_link');

nav_selects.forEach(item => {
    const item_child = item.firstElementChild;
    const span_item_child = item_child.firstElementChild;
    const div_select = item_child.nextElementSibling;

    const all_arrow_nav = document.querySelectorAll('.arrow-nav')

    item_child.addEventListener('click', (e) => {
        // Cerrar todos los desplegables antes de abrir el actual
        nav_selects.forEach((otherItem) => {
            const otherItemChild = otherItem.firstElementChild;
            const otherDivSelect = otherItemChild.nextElementSibling;
            if(otherDivSelect !== div_select && otherDivSelect.classList.contains('show')){
                otherDivSelect.classList.remove('show');
            }
        }); 
        

        all_arrow_nav.forEach(arrow =>{
            if (arrow !== span_item_child) {
                arrow.classList.remove('arrow-open')
            }
            else{
                span_item_child.classList.toggle('arrow-open')
            }
        })
        

        div_select.classList.toggle('show');
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!div_select.contains(e.target) && div_select.classList.contains('show')) {
            div_select.classList.remove('show');

            span_item_child.classList.toggle('arrow-open')

        }
    });
});

