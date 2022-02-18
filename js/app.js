import Dashboard from './views/Dashboard.js';
import Products from './views/Products.js';
import Accounts from './views/Accounts.js';
import Supplier from './views/Supplier.js';
import Debtors from './views/Debtors.js';
import Reports from './views/Reports.js';
import Home from './views/Home.js';
import Orders from './views/Orders.js';
import Sales from './views/Sales.js';
import Return from './views/Return.js';
import Signin from './views/Signin.js';

const router = async () => {
    const routes = [
        { path: "?pg=signin", view: Signin },
        { path: "?pg=dashboard", view: Dashboard },
        { path: "?pg=products", view: Products },
        { path: "?pg=accounts", view: Accounts },
        { path: "?pg=supplier", view: Supplier },
        { path: "?pg=debtors", view: Debtors },
        { path: "?pg=reports", view: Reports },
        { path: "?pg=home", view: Home },
        { path: "?pg=orders", view: Orders },
        { path: "?pg=sales", view: Sales },
        { path: "?pg=return", view: Return },
    ];

    const routInfo = routes.map((route) => {
        return {
            page: route,
            isActive: window.location.search === route.path

        }
    });

    let activeView = routInfo.find((page) => page.isActive);

    if(!activeView){
        activeView = {
            page: routes[0],
            isActive: true

        }
    }

    document.querySelector('header .top_nav .user .user_info').addEventListener('click', () => {
        document.querySelector('.profile_signout').classList.toggle('show')
        document.querySelector('.profile_signout').addEventListener('click', () => {
            document.querySelector('.profile_signout').classList.toggle('show')
            window.localStorage.removeItem('outdoorgear');
            navigateTo('home.html?pg=signin');
        });
    });

    let view = new activeView.page.view();
    if(activeView.page.path !="?pg=signin"){
        let siteData = await getData();
        // CHECK IF USER IS LOGED IN
        if(typeof(siteData.sessions) == "object"){
            // PROCED IF USER IS LOGED IN
            if(document.querySelector('main') == null){
                const main = document.createElement('main');
                document.querySelector('header').after(main);
            }
            // GET PAGE INFORMATION
            document.querySelector('main').innerHTML = await view.getPage();

            // ASSIGN TOTAL CART ITEMS 
            document.querySelector("#showCart sup").textContent = Object.keys(siteData.cart).length;


            Object.keys(siteData.sessions).forEach((session) => {
                document.getElementById('logedin_user').textContent = siteData.sessions[session].first_name;
                document.getElementById('logedin_user').dataset.user_id = siteData.sessions[session].user_id;
                document.getElementById('logged_in_img').src = "./images/" + siteData.sessions[session].image;

                if(siteData.sessions[session].user_type == "Attendant"){
                    document.getElementById('attendant_logo').classList.add('show');

                    // MAKE PAGE FULLSCREAN
                    document.querySelector('main').classList.add('fullScreen');
                    document.querySelector('.page').classList.add('fullScreen');

                }else if(siteData.sessions[session].user_type == "Systems Admin"){
                    if(document.querySelector('nav') == null){
                        const nav = document.createElement('nav');
                        document.querySelector('header').before(nav);
                        nav.innerHTML = new Home().getNavigation();
                        // ACTIVATE SIGN OUT;
                        document.getElementById('siginout').addEventListener('click', () => {
                            window.localStorage.removeItem('outdoorgear');
                        });
                    }
                }
            });



            switch(activeView.page.path.split('=')[1]){
                case 'home':        
                    let homeProducts = await view.addHomeProduct(document.querySelector('.product_display')); 

                    // ADD PRODUCT FULL DETAILS TO THE DOM deliver
                    if(document.querySelector('.p_full_details') == null){
                        const p_full_details = document.createElement('section');
                        p_full_details.classList.add('p_full_details');
                        p_full_details.setAttribute('id', 'product_full_details');
                        document.querySelector('main').after(p_full_details);
                    }

                    // GET ELEMENTS IN REGUARD TO PRODUCT DETAILS
                    const p_details = document.querySelectorAll('.p_details');
                    const p_full_details = document.querySelector('.p_full_details');

                    // ONCLICK SHOW PRODUCT DETAILS
                    p_details.forEach((p_detail, index) => p_detail.addEventListener('click', () => {
                        // console.log(p_detail.dataset.product);

                        p_full_details.innerHTML = view.addPDFTemplate();
                        document.getElementById('add_cart').dataset.index = index;

                        document.getElementById('product_full_details').classList.add('show');
                        const closeP_details = document.getElementById('closeP_details');
                        // ON CLIK HIDE THE PRODUCT DETAILS
                        closeP_details.addEventListener('click', () => {
                            p_full_details.classList.toggle('show');
                        });

                        // GET PRODUCT DETAILS
                        let PDTL = new Products().search("product_name", p_detail.dataset.product, "fetch_product_by_name");
                        PDTL.always(function(data){
                            if(data.response = "success"){
                                // COLORS
                                // console.log(data.message[1]);
                                let pColors = `<b>Select Color</b>`;
                                let count = 1;
                                data.message[1].forEach((color_name) => {
                                    home_available_colors
                                    pColors += `<span class='select_color ${(count == 1) ? 'selected': ''}' data-color="${color_name}">${color_name}</span>`;
                                    count++;
                                });
                                document.getElementById('home_available_colors').innerHTML = pColors;
                                setActiveClass(document.querySelectorAll('#home_available_colors span'), 'selected', data.message[2]);

                                // SIZES
                                // console.log(data.message[2]);
                                let pCSize = ``;
                                count = 1;
                                data.message[2].forEach((psize) => {
                                    // console.log(psize)
                                    if(document.querySelector('.available_colors .selected').dataset.color == psize.colour_name){
                                        let image = (psize.product_image == null) ? "./images/default.png": "./images/" + psize.product_image;
                                        pCSize += `<span class='select_size  ${(count == 1) ? 'selected': ''}' data-size="${psize.size_label}" data-desc="${psize.desc}" data-quantity="${psize.quantity}" data-productcode ="${psize.product_code}"  data-inventory_id ="${psize.inventory_id}" data-product_image="${image}"  data-id ="${psize.id}" >${psize.size_label}</span>`;
                                        // pCSize += `<span class='select_size ${(count == 1) ? 'selected': ''}' data-size="${psize.size_label}" data-desc="${psize.desc}" data-quantity="${psize.quantity}" data-productcode ="${psize.product_code}"  data-inventory_id ="${psize.inventory_id}"  data-product_image="${psize.product_image}"  data-id ="${psize.id}"  >${psize.size_label}</span>`;
                                        // pCSize += `<span class='select_size ${(count == 1) ? 'selected': ''}' data-size="${psize.size_label}" data-quantity = "${psize.quantity}" data-id ="${psize.size_label}" >${psize.size_label}</span>`;
                                        count++;

                                    }

                                });
                                document.getElementById('size_list').innerHTML = pCSize;
                                sizeClickAction( data.message[2] );
                                // setActiveClass(document.querySelectorAll('#size_list span'), 'selected', data.message[2]);
                                // getSelected(document.querySelector('#size_list .selected'),  data.message[2]);
                                // GET THE FIRST PRODUCT DETAILS IN THE LIST AND DISPLAY THEMM
                                // console.log(data.message[2][0])
                                document.getElementById('pName').textContent = data.message[2][0].name;
                                document.getElementById('pCategory').textContent = data.message[2][0].category_name;
                                document.getElementById('pProductCode').textContent = data.message[2][0].product_code;
                                document.getElementById('pBrandName').textContent = data.message[2][0].brand_name;
                                document.getElementById('pDesc').textContent = data.message[2][0].desc;
                                document.getElementById('pPrice').textContent = addComma(data.message[2][0].sale_price.toString());
                                document.getElementById('add_cart').dataset.id = data.message[2][0].id;
                                document.getElementById('add_cart').dataset.inventory_id = data.message[2][0].inventory_id;
                                document.getElementById('add_cart').style.backgroundColor = "green";
                                document.querySelector('.remove_quantity').dataset.id = data.message[2][0].id;
                                document.querySelector('.add_quantity').dataset.id = data.message[2][0].id;
                                document.getElementById('item_d_quantity').value = 1;
                                document.getElementById('pImage').setAttribute('src', (data.message[2][0].product_image == null) ? "./images/default.png": "./images/" + data.message[2][0].product_image);

                                productAdjuster(data.message[2]);

                            }
                        });
                    }));
                  
                    // CLOSE PRODUCT DETAILS WHEN YOU CLICK ON DARK PART add_cart
                    window.addEventListener('click', (e) => {
                        if(e.target == document.getElementById('product_full_details')){
                            p_full_details.classList.remove('show');
                        }
                    });


                    // ASSIDE INFORMATION
                    let res=null;
                    let availablebrands = await view.getBrands();
                    res = await addAssideComponets(availablebrands.message, document.getElementById('home_brands'));
                    let availablecolors = await view.getColors();
                    res = await addAssideComponets(availablecolors.message, document.getElementById('home_colors'));

                    let availablecategories = await view.getCategories();
                    let listItems = '';
                    availablecategories.message.forEach((item) => {
                        listItems += `
                            <li>
                                <span>${item.name}<b>32</b></span>
                                <i class="las la-plus"></i>
                            </li>
                            `;
                    });
                    document.getElementById('home_categories').innerHTML = listItems;
                    let availablesizes = await view.getSizes();
                    listItems = '';
                    let si = null;
                    availablesizes.message.forEach((item) => {
                        si = (item.name.split('').length > 5) ? item.name.split('')[0] + item.name.split('')[1]: item.name;
                        listItems += `
                            <span>${si}</span>
                            `;
                    });
                    document.getElementById('home_sizes').innerHTML = listItems;
            

                break;

                case 'products':
                    // SHOW INVENTORY LIST
                    let inventory = await view.getInventory();
                    inventory = await view.addInventory(inventory.message, document.getElementById('inventory_items'));
                    // SHOW PRODUCT LIST
                    let products = await view.getProducts();
                    products = await view.addProduct(products.message, document.getElementById('product_items'));
                    // ADD POPUPS TO THE BODY
                    if(document.querySelector('.popups') == null){
                        const popups = document.createElement('div');
                        popups.classList.add('popups');
                        document.querySelector('body').prepend(popups);
                    }
                    document.querySelector('.popups').innerHTML = await view.addPopups();


                    // ADD DROP DOWN VALUES FOR SELECTS IN THE POPUP/POPUP INFORMATION
                    if(localStorage.getItem('outdoorgear')){
                        var site = JSON.parse(localStorage.getItem('outdoorgear'));

                        let products = await view.getProducts();
                        let brands = await view.getBrands();
                        let branches = await view.getBranches();
                        let categories = await view.getCategories();
                        let discounts = await view.getDiscounts();
                        let statuses = await view.getStatus();
                        let sizes = await view.getColors();
                        let colors = await view.getSuppliers();
                        let suppliers = await view.getSizes();
                        // console.log(products.message, branches.message, categories.message, discounts.message, statuses.message, sizes.message, colors.message, suppliers.message)

                            // INVENTORY
                        // ADD DROPDOWNS TO SELECT ELEMENTS IN POPUPS
                        document.getElementById('add_inventory_product_code').innerHTML =  generateDropdown(products.message, 'product_code', 'product_code', "Choose product Code");
                        let productNameArr = [];
                        products.message.forEach((productDetails) => {
                            // console.log(productDetails.name)
                            if(!productNameArr.includes(productDetails.name.toLowerCase())){
                                productNameArr.push(productDetails.name.toLowerCase());
                            }
                        });
                        let product_names = [];
                        productNameArr.forEach((productName) => {
                            product_names.push({name:  titleCase(productName)})
                        })
                        // console.log(product_names)
                        document.getElementById("add_inventory_product_name").innerHTML = generateDropdown(product_names, 'name', 'name', 'Choose product name');
                        document.getElementById("add_inventory_category").innerHTML = generateDropdown(categories.message, 'name', 'id', 'Choose product category');
                        document.getElementById("add_inventory_branch").innerHTML = generateDropdown(branches.message, 'name', 'id', 'Choose inventory branch');
                        document.getElementById("add_inventory_brand").innerHTML = generateDropdown(brands.message, 'name', 'id', 'Choose product brand');
                        document.getElementById("add_inventory_discount").innerHTML = generateDropdown(discounts.message, 'name', 'id', 'Choose product discount');
                        document.getElementById("add_inventory_status").innerHTML = generateDropdown(statuses.message, 'name', 'id', 'Choose inventory status');
                        
                        // DROPDOWN SELECTIONS
                        document.getElementById('add_inventory_product_name').addEventListener('click', () => {
                            findCorespondingProductCodes(products.message, document.getElementById('add_inventory_product_name').value);

                        });
                        document.getElementById('add_inventory_product_code').addEventListener('click', () => {
                            // console.log(document.getElementById('add_inventory_product_code').value)
                            findCorespondingValue(products.message, document.getElementById('add_inventory_product_code').value);

                        });


                        // let brands = site.fetch_all_brands; saveInventory
                        // let categories = site.fetch_all_categories; deliver

                        // PRODUCT

                        document.getElementById("create_product_category").innerHTML = generateDropdown(categories.message, 'name', 'id', 'Choose product category');
                        document.getElementById("create_product_brand").innerHTML = generateDropdown(brands.message, 'name', 'id', 'Choose product brand');
                        document.getElementById("create_product_color").innerHTML = generateDropdown(colors.message, 'name', 'id', 'Choose product color');
                        document.getElementById("create_product_size").innerHTML = generateDropdown(sizes.message, 'name', 'id', 'Choose product size');
                        document.getElementById("create_product_supplier").innerHTML = generateDropdown(suppliers.message, 'name', 'id', 'Choose product supplier');

                    }
                    window.addEventListener('click', (e) => {
                        if(e.target === document.querySelector('.popups')){
                            document.querySelector('.popups').classList.remove('active');
                        }
                    })
                    document.querySelectorAll('.entry_header i.la-times').forEach((close) => {

                        close.addEventListener('click', () => {
                            document.querySelector('.popups').classList.remove('active');
                        });
                    });

                    // IMAGE PREVIEW
                    document.getElementById('image_upload_btn').addEventListener('change', () => {
                        console.log(image_upload_btn.files);
                        const imageDisplay = document.getElementById('image_display');
                        imageDisplay.src = URL.createObjectURL(image_upload_btn.files[0]);

                    });

                    // ADD NEW PRODUCT INFORMATION
                    document.getElementById('add_product').addEventListener('click', () => {
                        document.querySelector('.popups').classList.add('active');
                        document.querySelector('.inventory_in').classList.remove('active');
                        document.querySelector('.product_in').classList.add('active');


                        document.querySelector('.product_in').addEventListener('submit', (e) => {
                            e.preventDefault();

                            let productImage = view.uploadFile(document.getElementById('image_upload_btn'));
                            productImage.always(function(productImage){
                                console.log(productImage);
                                const product_details = {
                                    "product_name": titleCase(document.getElementById("create_product_product_name").value),
                                    "description": document.getElementById("create_product_product_discription").value,
                                    "category_id": document.getElementById("create_product_category").value,
                                    "remarks" : document.getElementById("create_product_remarks").value,
                                    "sale_price" : removeComma(document.getElementById("create_product_sale_price").value),
                                    "buy_price": removeComma(document.getElementById("create_product_buy_price").value),
                                    "brand_id": document.getElementById("create_product_brand").value,
                                    "colour_id": document.getElementById("create_product_color").value,
                                    "size_id": document.getElementById("create_product_size").value,
                                    "product_code": document.getElementById("create_product_product_code").value.toUpperCase(),
                                    "supplier_id": document.getElementById("create_product_supplier").value,
                                    "productImage": productImage[0]
                                }

                                // console.log(product_details);
                                
                                
                                let response = view.saveProduct(product_details);
                                // console.log(response);
                                response.always(function(data){
                                    console.log(data);
                                    document.querySelector('.popups').classList.remove('active');
                                    navigateTo('home.html?pg=products');
                                    
                                });                   
                            });

                        })

                    });
                    // UPDATE PRODUCT INFORMATION
                    document.querySelectorAll('.edit_product').forEach((edit_product) => {
                        edit_product.addEventListener('click', (e) => {
                            e.preventDefault();
                            // console.log();
                            document.querySelector('.popups').classList.add('active');
                            document.querySelector('.inventory_in').classList.remove('active');
                            document.querySelector('.product_in').classList.add('active');

                            document.getElementById('productOperations').setAttribute('value', 'Update');
                            // GET PRODUCT INFORMATION
                            let productID = edit_product.dataset.productid;
                            let response = view.getProductDetails(productID);
                                // console.log(response);
                            response.always(function(data){
                                // console.log(data);
                                // console.log(data.message[0] )
                                // ASSIGN PRODUCT INFORMATION TO THE FORM FIELD IN THE CREATE
                                setSelectedValue(document.getElementById('create_product_category'), data.message[0].category_id );
                                setSelectedValue(document.getElementById('create_product_brand'), data.message[0].brand_id );
                                setSelectedValue(document.getElementById('create_product_color'), data.message[0].colour_id );
                                setSelectedValue(document.getElementById('create_product_size'), data.message[0].size_id );
                                setSelectedValue(document.getElementById('create_product_supplier'), data.message[0].supplier_id );

                                document.getElementById("create_product_product_code").value = data.message[0].product_code.toUpperCase();
                                document.getElementById("create_product_product_name").value = titleCase(data.message[0].name);
                                document.getElementById("create_product_buy_price").value = addComma(data.message[0].buy_price.toString());
                                document.getElementById("create_product_sale_price").value = addComma(data.message[0].sale_price.toString());
                                document.getElementById("create_product_remarks").value = data.message[0].remarks;
                                document.getElementById("create_product_product_discription").value = data.message[0].desc;
                                let image_name = (data.message[0].product_image != null) ? data.message[0].product_image : 'default.png';
                                document.getElementById("image_display").setAttribute("src", "./images/" + image_name);
                                document.getElementById("image_display").dataset.imagename = image_name;
                                document.querySelector('.product_in').addEventListener('submit', (e) => {
                                    e.preventDefault();
                                    // UPDATE ACTION

                                    const product_details = {
                                        "product_name": titleCase(document.getElementById("create_product_product_name").value),
                                        "description": document.getElementById("create_product_product_discription").value,
                                        "category_id": document.getElementById("create_product_category").value,
                                        "remarks" : document.getElementById("create_product_remarks").value,
                                        "sale_price" : removeComma(document.getElementById("create_product_sale_price").value),
                                        "buy_price": removeComma(document.getElementById("create_product_buy_price").value),
                                        "brand_id": document.getElementById("create_product_brand").value,
                                        "colour_id": document.getElementById("create_product_color").value,
                                        "size_id": document.getElementById("create_product_size").value,
                                        "product_code": document.getElementById("create_product_product_code").value.toUpperCase(),
                                        "supplier_id": document.getElementById("create_product_supplier").value,
                                        "product_id": productID
                                    }
                                    console.log(document.getElementById('image_upload_btn').files)
                                    if(document.getElementById('image_upload_btn').files.length != 0){
                                        let productImage = view.uploadFile(document.getElementById('image_upload_btn'));
                                        productImage.always(function(productImage){
                                            console.log(productImage);
                                            product_details.productImage = productImage[0];
                                            // console.log(product_details);
                                            let response = view.updateProduct(product_details);
                                            response.always(function(data){
                                                console.log(data.message);

                                            });
                                        });

                                    }else{
                                        product_details.productImage = document.getElementById("image_display").dataset.imagename;

                                        let response = view.updateProduct(product_details);
                                         response.always(function(data){
                                            console.log(data.message);

                                        });

                                    }
                                    // document.querySelector('.popups').classList.remove('active');
                                    // navigateTo('home.html?pg=products');

                                        
                                });
                            });
                        });
                    });


                    // ADD NEW INVENTORY PRODUCT saveInventory
                    document.getElementById('add_inventory').addEventListener('click', () => {
                        // console.log('clicked');
                        document.querySelector('.popups').classList.add('active');
                        document.querySelector('.product_in').classList.remove('active');
                        document.querySelector('.inventory_in').classList.add('active');
                    });

                    // CREATE INVENTORY SUBMITION
                    document.querySelector('.inventory_in').addEventListener('submit', (e) => {
                        e.preventDefault();
                        if(document.getElementById('saveInventory').value == "Save"){

                            let inventoryProduct = {
                                'quantity' : document.getElementById('add_inventory_quantity').value,
                                'product_id' : document.getElementById('add_inventory_product_id').value,
                                'branch_id' : document.getElementById("add_inventory_branch").value,
                                'discount_id' : document.getElementById("add_inventory_discount").value,
                                'status_id' : document.getElementById("add_inventory_status").value,
                            }

                            if(document.getElementById('add_inventory_quantity').value != "" && document.getElementById("add_inventory_branch").value !=""){
                                let response = view.addProductToInventory(inventoryProduct);
                                // console.log(response);
                                response.always(function(data){
                                    console.log(data);
                                    deliverNotification(data.message, 'success');
                                    document.querySelector('.popups').classList.remove('active')
                                    // navigateTo('home.html?pg=products');

                                    // SHOW INVENTORY LIST p_details
                                    // inventory = view.getInventory();
                                    // inventory = view.addInventory(inventory.message, document.getElementById('inventory_items'));
                                    
                                });

                            }
                        }
                    })

                    // UPDATE INVENTORY INFORMATION
                     document.querySelectorAll('.edit_inventory').forEach((edit_inventory) => {
                        edit_inventory.addEventListener('click', (e) => {
                            e.preventDefault();

                            // console.log();
                            document.querySelector('.popups').classList.add('active');
                            document.querySelector('.inventory_in').classList.add('active');
                            document.querySelector('.product_in').classList.remove('active');

                            document.getElementById('saveInventory').setAttribute('value', 'Update');

                            if(document.getElementById('saveInventory').value == "Update"){
                                // GET PRODUCT INFORMATION
                                let inventoryID = edit_inventory.dataset.inventoryid;
                                document.getElementById('saveInventory').dataset.inventoryid = edit_inventory.dataset.inventoryid;
                                console.log(inventoryID);
                                let response = view.specificityOperation(inventoryID, 'get_inventory_details', {});
                                response.always(function(data){
                                    console.log(data.message[0] )
                                    // ASSIGN PRODUCT INFORMATION TO THE FORM FIELD IN THE CREATE p_info
                                    document.getElementById('add_inventory_quantity').value = data.message[0].quantity;
                                    setSelectedValue(document.getElementById('add_inventory_category'), data.message[0].category_id );
                                    setSelectedValue(document.getElementById('add_inventory_brand'), data.message[0].brand_id );
                                    setSelectedValue(document.getElementById('add_inventory_branch'), data.message[0].branch_id );
                                    setSelectedValue(document.getElementById('add_inventory_status'), data.message[0].status_id );
                                    setSelectedValue(document.getElementById('add_inventory_discount'), data.message[0].discount_id );

                                    document.getElementById("add_inventory_product_code").value = data.message[0].product_code.toUpperCase();
                                    document.getElementById("add_inventory_product_name").value = titleCase(data.message[0].name);
                                    document.getElementById("add_inventory_buy_price").value = addComma(data.message[0].buy_price.toString());
                                    document.getElementById("add_inventory_sale_price").value = addComma(data.message[0].sale_price.toString());
                                    document.querySelector('.inventory_in').addEventListener('submit', (e) => {
                                        e.preventDefault();
                                        // UPDATE ACTION
                                        let inventoryProduct = {
                                            'quantity' : document.getElementById('add_inventory_quantity').value,
                                            'product_id' : document.getElementById('add_inventory_product_id').value,
                                            'branch_id' : document.getElementById("add_inventory_branch").value,
                                            'discount_id' : document.getElementById("add_inventory_discount").value,
                                            'status_id' : document.getElementById("add_inventory_status").value,
                                        }

                                        let response = view.specificityOperation(document.getElementById('saveInventory').dataset.inventoryid, 'update_inventory', inventoryProduct);
                                        response.always(function(data){
                                            deliverNotification(data.message, 'success');
                                            document.getElementById('saveInventory').setAttribute('value', 'Save');
                                        });
                                       
                                        document.querySelector('.popups').classList.remove('active');
                                        navigateTo('home.html?pg=products');

                                            
                                    });
                                });

                            }
                        });
                    });
                
                break;

                case 'sales':
                    new Sales().generateSales();
                break;

                case 'signin':
                    
                break;

                default:
                    console.log('Not yet set');

            }
        }else{
            window.localStorage.removeItem('outdoorgear');
            navigateTo('home.html?pg=signin');
        }

    }else{
        let site = await getData();
        if(!site.sessions || Object.keys(site.sessions).length == 0){
            const signin = document.createElement('section');
            signin.classList.add('sign-in-container');
            document.querySelector('body').prepend(signin);
            document.querySelector('.sign-in-container').innerHTML = await view.getPage();
            document.querySelector('.sign-in-container form').addEventListener('submit', (e)=>{
                e.preventDefault();

                const signinUsername = document.getElementById('signinUsername').value;
                const signinPassword = document.getElementById('signinPassword').value;

                if(signinPassword != "" && signinUsername !=""){
                    let response = view.signin(signinUsername, signinPassword);
                    response.always(function(data){
                        if(data.response == "failed"){
                            document.getElementById('signinPassword').value="";
                            deliverNotification(data.message, 'error');

                        }else{
                            deliverNotification("Welcome "+ data.message.first_name, 'success');
                            document.getElementById('logedin_user').textContent = data.message.first_name;
                            document.getElementById('logedin_user').dataset.user_id = data.message.user_id;
                            document.getElementById('logged_in_img').src = "./images/" + data.message.image;
                            document.querySelector('.sign-in-container').classList.add('hide');

                            // FETCH THE PRODUCTS FROM DATABASE 
                            let homeProducts = new Home().getInventoryProducts();
                            let fetch = new Home().fetchAll("fetch_all_payment_types");

                            // GET ALL NECESSARY DATA IN REGARD TO PRODUCTS p_details
                            let requestResponse = new Products().getBrands();
                            requestResponse = new Products().getBranches();
                            requestResponse = new Products().getCategories();
                            requestResponse = new Products().getDiscounts();
                            requestResponse = new Products().getStatus();
                            requestResponse = new Products().getColors();
                            requestResponse = new Products().getSuppliers();
                            requestResponse = new Products().getSizes();


                            (data.message.user_type == "Attendant") ? window.location = 'home.html?pg=home' : window.location = 'home.html?pg=dashboard' ;


                        }
                    });
                }else{
                    alert('username and password required')
                }
            })
        }else{
            let hunderRefresh = await refresh(site);
        }
    }
    // console.log(activeView.page.view); data-aqty

}
const deliverNotification = (msg, msgtype) => {
    document.querySelector('.notification span').innerHTML = msg;

    document.querySelector('.notification').classList.forEach((nclass) => {
        if(nclass !== 'notification'){
            document.querySelector('.notification').classList.remove(nclass);
        }
    });
    document.querySelector('.notification').classList.add('show');
    document.querySelector('.notification').classList.add(msgtype);

    document.querySelector('.notification i').addEventListener('click', () => {
        document.querySelector('.notification').classList.remove('show');
    })
}
const setActiveClass = (elementList, elementClass, homeProducts) => {
    elementList.forEach((element, index) => element.addEventListener('click', () => {
        elementList.forEach((allelement) => allelement.classList.remove(elementClass));
        // SET ACTIVE CLASS TO CLICKED 
        element.classList.toggle('selected');

        // remove notification
        let currentValue = document.getElementById('item_d_quantity').value;
        document.getElementById('item_d_quantity').value =(Number(currentValue) >= document.querySelector('.available_size .selected').dataset.quantity) ? document.querySelector('.available_size .selected').dataset.quantity : Number(currentValue) + 1;
        if(Number(document.getElementById('item_d_quantity').value) > document.querySelector('.available_size .selected').dataset.quantity){
            deliverNotification('Only ' +document.querySelector('.available_size .selected').dataset.quantity + ' product<small>(s)</small> in stock please!', 'warning' );
        }else{
            document.querySelector('.notification').classList.forEach((nclass) => {
                if(nclass !== 'notification'){
                    document.querySelector('.notification').classList.remove(nclass);
                }
            });
        }

        // RESET QUANTITY TO ZERO
        document.getElementById('item_d_quantity').dataset.quantity = 1;
        document.getElementById('item_d_quantity').value = 1;
        

        getSelected(document.querySelector('#size_list .selected'),  homeProducts);
    }));

}
const getSelected = (element, homeProducts) => {
    // console.log(homeProducts)
    let sizes = [];
    let count = 1;
    let sizeSpans = ``;
    homeProducts.forEach((psize, index) => {
        if(document.querySelector('.available_colors .selected').dataset.color == psize.colour_name){
            let image = (psize.product_image == null) ? "./images/default.png": "./images/" + psize.product_image;
            sizeSpans += `<span class='select_size  ${(count == 1) ? 'selected': ''}' data-size="${psize.size_label}" data-desc="${psize.desc}" data-quantity="${psize.quantity}" data-productcode ="${psize.product_code}"  data-inventory_id ="${psize.inventory_id}" data-product_image="${image}"  data-id ="${psize.id}" >${psize.size_label}</span>`;
            count++;
            // GET THE FIRST PRODUCT DETAILS IN THE LIST AND DISPLAY THEMM
            // console.log(psize.name)
            document.getElementById('pName').textContent = psize.name;
            document.getElementById('pCategory').textContent = psize.category_name;
            document.getElementById('pProductCode').textContent = psize.product_code;
            document.getElementById('pBrandName').textContent = psize.brand_name;
            document.getElementById('pDesc').textContent = psize.desc;
            document.getElementById('pPrice').textContent = psize.sale_price;
            document.getElementById('add_cart').dataset.id = psize.id;
            document.getElementById('add_cart').dataset.inventory_id = psize.inventory_id;
            document.getElementById('add_cart').style.backgroundColor = "green";
            document.querySelector('.remove_quantity').dataset.id = psize.id;
            document.querySelector('.add_quantity').dataset.id = psize.id;
            document.getElementById('item_d_quantity').value = 1;
            document.getElementById('pImage').setAttribute('src', (psize.product_image == null) ? "./images/default.png": "./images/" + psize.product_image);
        }
        document.getElementById('size_list').innerHTML = sizeSpans;


    });
    sizeClickAction(homeProducts);

}
const sizeClickAction = (homeProducts) => {
    document.querySelectorAll('#size_list span').forEach((element, index) => element.addEventListener('click', () => {
        document.querySelectorAll('#size_list span').forEach((allelement) => allelement.classList.remove('selected'));
        // SET ACTIVE CLASS TO CLICKED 
        element.classList.toggle('selected');

        // remove notification
        let currentValue = document.getElementById('item_d_quantity').value;
        document.getElementById('item_d_quantity').value =(Number(currentValue) >= document.querySelector('.available_size .selected').dataset.quantity) ? document.querySelector('.available_size .selected').dataset.quantity : Number(currentValue) + 1;
        if(Number(document.getElementById('item_d_quantity').value) > document.querySelector('.available_size .selected').dataset.quantity){
            deliverNotification('Only ' +document.querySelector('.available_size .selected').dataset.quantity + ' product<small>(s)</small> in stock please!', 'warning' );
        }else{
            document.querySelector('.notification').classList.forEach((nclass) => {
                if(nclass !== 'notification'){
                    document.querySelector('.notification').classList.remove(nclass);
                }
            });
        }
        // console.log(index)
        document.getElementById('pProductCode').textContent = element.dataset.productcode;
        document.getElementById('pDesc').textContent = element.dataset.desc;
        document.getElementById('add_cart').dataset.id = element.dataset.id
        document.getElementById('add_cart').dataset.inventory_id = element.dataset.inventory_id

        document.getElementById('pImage').setAttribute('src', element.dataset.product_image);
        console.log(element.dataset.product_image)
        document.getElementById('item_d_quantity').dataset.quantity = 1;
        document.getElementById('item_d_quantity').value = 1;

    }));
    // productAdjuster(homeProducts);        

}
const getData = async () => {
    var site = {};
    if(localStorage.getItem('outdoorgear')){
        site = JSON.parse(localStorage.getItem('outdoorgear'));
    }

    return site;
}
const refresh = async (site)=>{
    let sessions = site.sessions;
    if(!sessions){
        navigateTo('home.html?pg=signin');
    }else{
        Object.keys(sessions).forEach((session) => {
            console.log(sessions[session])
            document.getElementById('logedin_user').textContent = sessions[session].first_name;
            document.getElementById('logedin_user').dataset.user_id = sessions[session].user_id;
            document.getElementById('logged_in_img').src = "./images/" + sessions[session].image;


        });
        document.querySelector("#showCart sup").textContent = Object.keys(site.cart).length;
        navigateTo('home.html?pg=home');

    }

}
const generateReceipt = (cart_items) => {
    
    let allItems = '';
    let totalPrice = 0;
    Object.keys(cart_items).forEach((cart_item) => {
    // console.log(cart_items[cart_item]);showCart
        allItems += `
            <tr>
                <td>
                    <span class="item_code">${cart_items[cart_item].product_code}</span>
                </td>
                <td>
                    <span class="item_name">${cart_items[cart_item].name}</span>
                </td>
                <td>
                    <span class="item_quantity">${cart_items[cart_item].quantity}</span>
                </td>
                <td>
                    <span class="item_price">${addComma(cart_items[cart_item].price.toString())}<small>/=</small></span>
                </td>
                <td>
                    <span class="item_total">${addComma((Number(cart_items[cart_item].price) * Number(cart_items[cart_item].quantity)).toString())}<small>/=</small></span>
                </td>
            </tr>
        `;

        totalPrice += Number(cart_items[cart_item].price) * Number(cart_items[cart_item].quantity);
    })
    document.getElementById('receipt_items').innerHTML = allItems;
    let sessions = getLocalData().sessions;
    document.getElementById("outlet").innerHTML = "Outlet: " + sessions[Object.keys(sessions)[0]].branch;
    // invoice_no 
    // let d = new Date();
    // console.log(d.get)
    document.getElementById('invoice_date').innerHTML = "<b>Date</b>: 29/01/2022 3:45:23 PM";
    // payType
    document.getElementById('totalPrice').textContent = addComma(totalPrice.toString());
    document.getElementById('receipt_attendant').textContent = getLocalData().sessions[document.getElementById('logedin_user').dataset.user_id].first_name;
}
const warning = (elementList, elementToCheck,msg) =>{
    elementList.forEach((element) => element.addEventListener('click', (e) => {
        e.preventDefault();
        if(document.querySelector(elementToCheck + " .selected") == null){

            deliverNotification(msg, 'warning');
        }else{
            document.querySelector('.notification').classList.forEach((nclass) =>{
                if(nclass != 'notification'){
                    document.querySelector('.notification').classList.remove((nclass));
                }
            })
        }
    }));
}
const productAdjuster = (homeProducts) => {
    // GET PRODUCT ADJUSTERS AND QUANTITYcart_section
    const remove_quantity = document.querySelectorAll('.remove_quantity');
    const add_quantity = document.querySelectorAll('.add_quantity');
    const item_d_quantity = document.getElementById('item_d_quantity');
    const sizes = document.querySelector('.available_size .selected');
    // console.log(sizes.dataset.size);
    // console.log(sizes.dataset.quantity);
    // console.log(sizes.dataset);
    add_quantity.forEach((add_quantity_btn) => add_quantity_btn.addEventListener('click', (e) => {
        e.preventDefault();
        let currentValue = document.getElementById('item_d_quantity').value;
        document.getElementById('item_d_quantity').value = Number(currentValue) + 1;

        if(Number(document.getElementById('item_d_quantity').value) > sizes.dataset.quantity){
            document.getElementById('item_d_quantity').value = Number(sizes.dataset.quantity);
            deliverNotification('Only ' + sizes.dataset.quantity + ' product<small>(s)</small> in stock please!', 'warning' );
        }else{
            document.querySelector('.notification').classList.forEach((nclass) => {
                if(nclass !== 'notification'){
                    document.querySelector('.notification').classList.remove(nclass);
                }
            });
        }
        setCartItem(homeProducts);

    }));
    remove_quantity.forEach((remove_quantity_btn) => remove_quantity_btn.addEventListener('click', (e) => {
        e.preventDefault();
        let currentValue = document.getElementById('item_d_quantity').value;
        document.getElementById('item_d_quantity').value = (Number(currentValue) == 1) ? 1 : Number(currentValue) - 1;
        const sizes = document.querySelector('.available_size .selected');
        setCartItem(homeProducts);
        if(Number(document.getElementById('item_d_quantity').value) > sizes.dataset.quantity){
            deliverNotification('Only ' +sizes.dataset.quantity + ' product<small>(s)</small> in stock please!', 'warning' );
            document.getElementById('item_d_quantity').value = Number( sizes.dataset.quantity);
        }else{
            document.querySelector('.notification').classList.remove('show');
        }
    }));
    document.getElementById('item_d_quantity').addEventListener('change', () => {
        let currentValue = document.getElementById('item_d_quantity').value;
        document.getElementById('item_d_quantity').value =(Number(currentValue) >= sizes.dataset.quantity) ? sizes.dataset.quantity : Number(currentValue) + 1;
        if(Number(document.getElementById('item_d_quantity').value) > sizes.dataset.quantity){
            deliverNotification('Only ' +sizes.dataset.quantity + ' product<small>(s)</small> in stock please!', 'warning' );
        }else{
            document.querySelector('.notification').classList.forEach((nclass) => {
                if(nclass !== 'notification'){
                    document.querySelector('.notification').classList.remove(nclass);
                }
            });
        }
    })

    // ADD TO CART
    document.getElementById('add_cart').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('add_cart').style.backgroundColor = "gray";
        let keyEnd = document.querySelector('#home_available_size .selected').dataset.size;

        let product_details = setCartItem(homeProducts);
        // console.log(product_details);
        let site = getLocalData();
        site.cart[document.getElementById('add_cart').dataset.id + '-' + keyEnd] = product_details ;
        localStorage.setItem('outdoorgear', JSON.stringify(site));
        document.querySelector("#showCart sup").textContent = Object.keys(site.cart).length;
        generateCart();
        // generateReceipt(site.cart);cart_section

    })
}
const productFDInfoBC = (productInfo, color) => {
    console.log(color, productInfo);
    console.log(productInfo);
}
const addToCartEvent = (view) => {
    document.querySelectorAll('.add_cart').forEach((add_cart) => {
    add_cart.addEventListener('click', (e) => {
        e.preventDefault();

        add_cart.style.backgroundColor = "Green";
        let cart = view.addToCart(add_cart.dataset.id + '-' + add_cart.dataset.size , 1);
        cart.then((response) => {
            console.log(response.msg);
            document.querySelector("#showCart sup").textContent = Object.keys(response.cart).length;
            // generateCart();
            // generateReceipt(response.cart);item_desc
        });
    });

});
}
const setCartItem = (homeProducts) => {
    // console.log(homeProducts)add_cart
    // GET PRODUCT INFORMAION
    if(localStorage.getItem('outdoorgear')){
        var site = JSON.parse(localStorage.getItem('outdoorgear'));
        let product_details = null;
        homeProducts.forEach((productD) => {
            if(productD.id == document.getElementById('add_cart').dataset.id){
                product_details = {
                    'id': document.querySelector('#add_cart').dataset.id,
                    'inventory_id': document.querySelector('#add_cart').dataset.inventory_id,
                    'product_code': document.getElementById('pProductCode').textContent,
                    'name': productD.name,
                    'brand': productD.brand_name,
                    'size': document.querySelector('.available_size span.selected').dataset.size,
                    'color': document.querySelector('.available_colors span.selected').dataset.color,
                    'image': (productD.product_image == null) ? "./images/default.png": "./images/" + productD.product_image,
                    'quantity': document.getElementById('item_d_quantity').value,
                    'desc': productD.name + " " + productD.brand_name + " " + document.querySelector('.available_size span.selected').dataset.size + " " + document.querySelector('.available_colors span.selected').dataset.color,
                    'available': document.querySelector('.available_size span.selected').dataset.quantity,
                    'index': document.querySelector('#add_cart').dataset.index,
                    'price': productD.sale_price,
                }
            }
        });

        return product_details;

    }
}
const removeItemFromCart =(key) =>{
    let site = getLocalData();
    delete site.cart[key]; 
    localStorage.setItem('outdoorgear', JSON.stringify(site));
    generateCart();
}
const updateCart = (key, index, updateData) =>{
    // console.log(updateData.price)
    let site = getLocalData();
    if(typeof(site.cart[key]) == "object"){
        site.cart[key].quantity = updateData.quantity ;
        site.cart[key].price = removeComma(updateData.price).split("@")[1];
        site.cart[key].desc = updateData.desc;
        localStorage.setItem('outdoorgear', JSON.stringify(site));
    }

    generateCart();
}
const generateCart = () => {
    let totalQty=0, totalPrS=0, totalPrD=0;
    let discount = 0;
    let paymentType = "Cash";

    let cartSect = `
        <div class="cart_list">

            <div class="cart_header">
                <span>#</span>
                <span>Product information</span>
                <span>Quantity</span>
                <span>Billing price</span>
                <span>Sub Total</span>
            </div>
            <div class="scroll_cart">
    `;
    if(localStorage.getItem('outdoorgear')){
        let cart = getLocalData().cart;
        document.querySelector("#showCart sup").textContent = Object.keys(cart).length;

        // console.log(cart);
        if(Object.keys(cart).length > 0){
            let count = 1;
            Object.keys(cart).forEach((cart_item) => {
                // console.log(cart[cart_item])
                cartSect += `

                <div class="cart_items">
                    <div class="cart_item">
                        <span>${count}</span>
                        <div class="p_info">
                            <span><img src="${cart[cart_item].image}"></span>
                            <span>
                                <small><b>Name: </b> ${cart[cart_item].name}</small>
                                <small><b>Brand: </b> ${cart[cart_item].brand}</small>
                                <small><b>Color: </b> ${cart[cart_item].color}</small>
                                <small><b>Size: </b> ${cart[cart_item].size}</small>
                            </span>
                        </div>
                        <span>
                            <label>
                                <a href="#" class="cartAdd" data-index="${cart[cart_item].index}" data-aqty="${cart[cart_item].available}" data-id="${cart[cart_item].id + '-' + cart[cart_item].size}"><i class="las la-plus"></i></a>
                                <input type="text" name="" value="${cart[cart_item].quantity}" id="${cart[cart_item].id + '-' + cart[cart_item].size}quantity">
                                <a href="#" class="cartRemove" data-aqty="${cart[cart_item].available}" data-id="${cart[cart_item].id + '-' + cart[cart_item].size}"><i class="las la-minus"></i></a>
                            </label>
                        </span>
                        <span>
                            <label>
                                <input type="text" name="" class="cart_price" data-id="${cart[cart_item].id + '-' + cart[cart_item].size}" id="${cart[cart_item].id + '-' + cart[cart_item].size}price" value="@${addComma(cart[cart_item].price.toString())}">
                            </label>
                        </span>
                        <span>
                            <label>
                                ${addComma((cart[cart_item].price * cart[cart_item].quantity).toString())}/=
                            </label>
                        </span>
                        <span class="remove_from_cart">
                            <i class="las la-times" data-id = "${cart[cart_item].id + '-' + cart[cart_item].size}"></i>
                        </span>
                        <span class="add_sale_desc"><b>Description: </b><input type="text" data-id="${cart[cart_item].id + '-' + cart[cart_item].size}"  data-quantity="${cart[cart_item].id + '-' + cart[cart_item].size}quantity" class="item_desc" data-price = "${cart[cart_item].id + '-' + cart[cart_item].size}price"  id="${cart[cart_item].id + '-' + cart[cart_item].size}desc" value="${cart[cart_item].desc}"></span>
                    </div>
                </div>
                `;
                count++;
                totalPrS += (cart[cart_item].price * cart[cart_item].quantity);
            });

            totalQty = Object.keys(cart).length;
        }else{
            
            document.querySelector("#showCart sup").textContent = 0;
            cartSect += `

                <div class="cart_items">
                    <div class="cart_item">
                        <span>Cart Empty</span>
                    </div>
                </div>
                `;

        }
        cartSect += `
                </div>
                <div class="cart_info">
                    <h2>Billing details</h2>
                    <div class="customer_info">
                        <input type="text" id="fname" placeholder="customer First name">
                        <input type="text" id="lname" placeholder="customer last name">
                        <input type="text" id="cemail" placeholder="customer email">
                        <input type="text" id="telephone" placeholder="customer telephone">
                    </div>
                    <div class="sale_info">
                        <div class="header">
                            <div class="cart_modifications">
                                <div class="field">
                                    <label>Add Payment Type</label>
                                    <select id="cart_payment_types">
                                    </select>
                                    <i class="las la-chevron-down"></i>
                                </div>
                                <div class="field">
                                    <label>Add Discount</label>
                                    <select id="cart_discrounts">
                                    </select>
                                    <i class="las la-chevron-down"></i>
                                </div>
                                
                            </div>
                            <span id="clearCart"><i class="las la-trash-alt"></i><b>Clear List</b></span>
                        </div>
                        <label for="printReceipt" class="printReceipt">
                            <input type = "checkbox" name="printReceipt" id="printReceipt" value="print">
                            <span>Print receipt</span>
                        </label>
                        <div class="sale_details">
                            <div class="sale_billing">
                                <span>Total Quantity: <b>${totalQty}</b></span>
                                <span>Total Price: <b>${addComma(totalPrS.toString())} /=</b></span>
                                <span>Total Price: <b>$ ${totalPrD}</b></span>
                            </div>
                            <div class="billing_info">
                                <span>Discount: <b>${discount}%</b></span>
                                <span>Payment: <b>${paymentType}</b></span>
                                <span class="cart_btn">
                                    <button id="receipt_preview">Preview receipt</button>
                                    <button id="checkout_btn">Checkout<i class="las la-chevron-right"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.cart_section').innerHTML = cartSect;
        
        let site = getLocalData();
        let discounts = (typeof(site.fetch_all_discounts) == "object") ? site.fetch_all_discounts : {};
        let cart_payment_types = (typeof(site.fetch_all_payment_types) == "object") ? site.fetch_all_payment_types : {};
        document.getElementById("cart_discrounts").innerHTML = generateDropdown(discounts, 'name', 'id', 'Choose discount');
        document.getElementById("cart_payment_types").innerHTML = generateDropdown(cart_payment_types, 'name', 'id', 'Choose Payment method');


        document.getElementById('clearCart').addEventListener('click', () => {
            console.log('we are registering')
            clearCart();
        });
        document.querySelectorAll('.remove_from_cart i').forEach((removeBtn) => {
            removeBtn.addEventListener('click', () => {
                // console.log(removeBtn.dataset.id);
                removeItemFromCart(removeBtn.dataset.id)
            });
        });
        // GET PRODUCT ADJUSTERS AND QUANTITY
        const cartAdd = document.querySelectorAll('.cartAdd');
        const cartRemove = document.querySelectorAll('.cartRemove');
        cartAdd.forEach((add_quantity_btn) => add_quantity_btn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentValue = document.getElementById(add_quantity_btn.dataset.id + 'quantity').value;
            // console.log(Number(currentValue) == Number(add_quantity_btn.dataset.aqty))

            document.getElementById(add_quantity_btn.dataset.id + 'quantity').value = (Number(currentValue) >= Number(add_quantity_btn.dataset.aqty)) ? Number(add_quantity_btn.dataset.aqty) : Number(currentValue) + 1;
            updateCart(add_quantity_btn.dataset.id,add_quantity_btn.dataset.index, {
                'quantity': document.getElementById(add_quantity_btn.dataset.id + 'quantity').value, 
                'price': document.getElementById(add_quantity_btn.dataset.id + "price").value,
                'desc': document.getElementById(add_quantity_btn.dataset.id + "desc").value
            });
        }));
        cartRemove.forEach((remove_quantity_btn) => remove_quantity_btn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentValue = document.getElementById(remove_quantity_btn.dataset.id + 'quantity').value;
            // console.log(currentValue)
            document.getElementById(remove_quantity_btn.dataset.id + 'quantity').value = (Number(currentValue) == 1) ? 1 : Number(currentValue) - 1;
            updateCart(remove_quantity_btn.dataset.id,remove_quantity_btn.dataset.index, {
                'quantity': document.getElementById(remove_quantity_btn.dataset.id + 'quantity').value, 
                'price': document.getElementById(remove_quantity_btn.dataset.id + "price").value,
                'desc': document.getElementById(remove_quantity_btn.dataset.id + "desc").value
            });
        }));
        const cart_price = document.querySelectorAll('.cart_price');
        cart_price.forEach((priceInput) => {
            priceInput.addEventListener('change', () => {
                document.getElementById(priceInput.dataset.id + 'quantity').value = removeComma(document.getElementById(priceInput.dataset.id + 'quantity').value);
                updateCart(priceInput.dataset.id,priceInput.dataset.index, {
                    'quantity': document.getElementById(priceInput.dataset.id + 'quantity').value, 
                    'price': priceInput.value,
                    'desc': document.getElementById(priceInput.dataset.id + "desc").value
                });
            });
        });
        const item_desc = document.querySelectorAll('.item_desc');
        item_desc.forEach((item_descInput) => {
            item_descInput.addEventListener('change', () => {
                // document.getElementById(item_descInput.dataset.id + 'desc').value = removeComma(document.getElementById(item_descInput.dataset.id + 'desc').value);
                updateCart(item_descInput.dataset.id,item_descInput.dataset.index, {
                    'quantity': document.getElementById(item_descInput.dataset.id + 'quantity').value, 
                    'price':  document.getElementById(item_descInput.dataset.id + 'price').value,
                    'desc': item_descInput.value
                });
            });
        });
    }
    document.getElementById('receipt_preview').addEventListener('click', () => {
        generateReceipt(getLocalData().cart)
        document.querySelector('.receipt_overlay').classList.add('active');
    });

    window.addEventListener('click', (e) => {
        if(e.target == document.querySelector('.receipt_overlay')){
            document.querySelector('.receipt_overlay').classList.remove('active');

        }
    });
    document.getElementById('checkout_btn').addEventListener('click', () => {
        if(Object.keys(getLocalData().cart).length != 0){

            let orderDetails = {
                'attendant_id': Object.keys(getLocalData().sessions)[0],
                'fname': document.getElementById('fname').value,
                'lname': document.getElementById('lname').value,
                'cemail': document.getElementById('cemail').value,
                'telephone': document.getElementById('telephone').value,
                'cart_payment_types': document.getElementById('cart_payment_types').value,
                'cart_discrounts': document.getElementById('cart_discrounts').value,
            }

            let saleItems = [];
            Object.keys(getLocalData().cart).forEach((cart_item) => {
                saleItems.push(getLocalData().cart[cart_item]);
            });
            orderDetails.cart = saleItems;
            if(document.getElementById('cemail').value != "" && document.getElementById('cart_payment_types').value !="" && document.getElementById('cart_discrounts').value != ""){
                let sale = new Sales().performOperation(null, 'make_sale', orderDetails);
                sale.always(function(data){
                    // console.log(data);
                    document.querySelector('.cart_overlay').classList.toggle('show');
                    if(data.response == 'success'){
                        let homeProducts = new Home().getInventoryProducts();
                        // console.log(data.message);
                        if (document.getElementById('printReceipt').checked == true){
                            generateReceipt(getLocalData().cart);
                            document.getElementById('invoice_date').innerHTML = `<b>Date</b> ${data.message.date}`
                            document.getElementById('invoice_no').innerHTML = `<b>No.</b> ${data.message.invoiceNo}`
                            print();

                        }
                        clearCart();
                        navigateTo(window.location.url);
                        
                        deliverNotification("Transaction completed successfully", 'success');
                    }else{
                        deliverNotification("Operation failed", 'error');

                    }
                });
            }else{
                deliverNotification("Important fields can not be Empty", 'warning');

            }
        }else{
            deliverNotification("Cart is Empty", 'warning');

        }
    });

}

const clearCart = () =>{
    let site = getLocalData();
    Object.keys(site.cart).forEach((cart_item) => {
        delete site.cart[cart_item];
    })
    localStorage.setItem('outdoorgear', JSON.stringify(site));
    document.querySelector("#showCart sup").textContent = Object.keys(site.cart).length;

    generateCart();
}
    
const print = () => {

    // PRINT RECEIT
    var restore = document.body.innerHTML;
    var printContent = document.querySelector('.receipt').innerHTML;
    document.body.innerHTML = printContent;
    if(window.print()){
        let site = getLocalData();
        site.cart = {}
        localStorage.setItem('outdoorgear', JSON.stringify(site));

    }
    document.body.innerHTML = restore;
    generateCart();
    navigateTo(window.location.url);
    if(document.querySelector('#showCart')){
        document.querySelector('#showCart').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.cart_overlay').classList.toggle('show');
        });
    }

    if(document.getElementById('product_full_details')){
        document.getElementById('product_full_details').classList.remove('show');
    }
}
// showCart
const addAssideComponets = async (itemList, itemElement) => {
    let listItems = '';
    itemList.forEach((item) => {
        listItems += `
            <li>
                <span>${item.name} <i class="las la-chevron-right"></i></span>
            </li>
            `;
    });
    itemElement.innerHTML = listItems
}
function titleCase(str) {
   var splitStr = str.split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}
const getLocalData = () => {
    var site = {};
    if(localStorage.getItem('outdoorgear')){
        site = JSON.parse(localStorage.getItem('outdoorgear'));
    }

    return site;
}
const findCorespondingProductCodes = (products, valueToFind) => {
    let product_codeArr = [];
    products.forEach((product) => {
        if(product.name.toLowerCase() == valueToFind.toLowerCase()){
            product_codeArr.push({product_code:  product.product_code});
        }
    });
    document.getElementById('add_inventory_product_code').innerHTML =  generateDropdown(product_codeArr, 'product_code', 'product_code', "Choose product Code");

    // console.log(product_codeArr);
}
const findCorespondingValue = (products, valueToFind) => {
    console.log(products);
    products.forEach((product) => {

        if(product.product_code == valueToFind){
            // console.log(product.product_code);
            document.getElementById('add_inventory_product_code').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_product_name'), titleCase(product.name));
            document.getElementById('add_inventory_product_name').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_category'), product.category_id);
            document.getElementById('add_inventory_category').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_brand'), product.brand_id);
            document.getElementById('add_inventory_brand').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_discount'), 5);
            document.getElementById('add_inventory_discount').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_status'), 3);
            document.getElementById('add_inventory_status').style.borderColor = 'green';

            document.getElementById('add_inventory_buy_price').value = addComma(product.buy_price.toString());
            document.getElementById('add_inventory_buy_price').style.borderColor = 'green';
            document.getElementById('add_inventory_sale_price').value = addComma(product.sale_price.toString());
            document.getElementById('add_inventory_sale_price').style.borderColor = 'green';

            document.getElementById('add_inventory_product_id').value = product.id;

            // console.log(titleCase(product.name));
        }
    });
}
function addComma (num) {
    let numArr = num.split('');
    let commadNumber = '', count = 0;

    for (var i = numArr.length - 1; i >= 0; i--) {
        count++;
        commadNumber += numArr[i];
        if(count == 3){
            commadNumber += ",";
            count = 0;
        }
    }
    let commadNumberArr = commadNumber.split('');
    // REMOVE LAST COMMA
    if (commadNumberArr[commadNumberArr.length - 1] ===',') {
        commadNumberArr.pop();
    }
    commadNumber="";
    // REARRANGE THE NUMBER BACK TO NORMAL
    for (var i = commadNumberArr.length - 1; i >= 0; i--) {
        commadNumber += commadNumberArr[i];
    }

    return commadNumber;
    
}
function removeComma (num) {
    let numArr = num.split(',');
    let nomalNumber = "";
    numArr.forEach((number) => {
        nomalNumber += number;
    });

    return nomalNumber;

}
const setSelectedValue = (selectObj, valueToSet) => {
    console.log(valueToSet, selectObj)
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].value== valueToSet) {
            selectObj.options[i].selected = true;
            // console.log(selectObj.options[i].value)
            return;
        }
    }
}
const generateDropdown = (data, key, value, instruction) => {
    var options = `<option selected>${instruction}</option>`;
    Object.keys(data).forEach((option) => {
        options += `<option value="${data[option][value]}">${data[option][key]}</option>`;
    });
    // console.log(options)
    return options;
}
const navigateTo = async (url) => {
    // console.log(url);
    history.pushState(null, null, url);
    router();
}
window.addEventListener('popstate', router);

// console.log(window.location.search)
document.addEventListener('DOMContentLoaded', () => {
    router();
    
    document.body.addEventListener('click', (e) => {
        
        if(e.target.matches("[data-pg]")){
            e.preventDefault();
            // console.log(e.target.href)

            navigateTo(e.target.href);

        }
    });

    const cart_overlay = document.querySelector('.cart_overlay');
    window.addEventListener('click', (e) => {
        if(e.target == document.querySelector('.cart_overlay')){
            cart_overlay.classList.remove('show');
        }
    });
    // const p_details = document.querySelectorAll('.p_details');
    

    // const p_full_details = document.querySelector('.p_full_details');
    // const closeP_details = document.getElementById('closeP_details');
    const product_full_details = document.getElementById('product_full_details');
    const showCart = document.getElementById('showCart');
    
    const toggle = document.getElementById('toggle');
    const topLinks = document.querySelector('.vBox');
    toggle.addEventListener('click', () => {
        topLinks.classList.toggle('show');
    })
    showCart.addEventListener('click', (e) => {
        e.preventDefault();
        generateCart();
        cart_overlay.classList.toggle('show');
    })
    // 
    // p_details.forEach((p_detail) => p_detail.addEventListener('click', () => {
    //     p_full_details.classList.toggle('show');
    // }));
    // closeP_details.addEventListener('click', () => {
    //     p_full_details.classList.toggle('show'); 
    // })
    
    document.getElementById('search_value').addEventListener('input', ()=> {
        // console.log(document.getElementById('search_value').value);
        let homeFs = new Home();
        let homeSearch = homeFs.searchInventory(document.getElementById('search_value').value, 'home_search');
        // console.log(homeSearch)
        homeSearch.always(function (homeSearchData) {
            
            // GET ELEMENTS IN REGUARD TO PRODUCT DETAILS
            const p_details = document.querySelectorAll('.p_details');
            const p_full_details = document.querySelector('.p_full_details');

            // ONCLICK SHOW PRODUCT DETAILS
            p_details.forEach((p_detail, index) => p_detail.addEventListener('click', () => {
                console.log(p_detail.dataset.product);

                p_full_details.innerHTML = homeFs.addPDFTemplate();
                document.getElementById('add_cart').dataset.index = index;

                document.getElementById('product_full_details').classList.add('show');
                const closeP_details = document.getElementById('closeP_details');
                // ON CLIK HIDE THE PRODUCT DETAILS
                closeP_details.addEventListener('click', () => {
                    p_full_details.classList.toggle('show');
                });

                // GET PRODUCT DETAILS
                let PDTL = new Products().search("product_name", p_detail.dataset.product, "fetch_product_by_name");
                PDTL.always(function(data){
                    if(data.response = "success"){
                        // COLORS
                        // console.log(data.message[1]);
                        let pColors = `<b>Select Color</b>`;
                        let count = 1;
                        data.message[1].forEach((color_name) => {
                            home_available_colors
                            pColors += `<span class='select_color ${(count == 1) ? 'selected': ''}' data-color="${color_name}">${color_name}</span>`;
                            count++;
                        });
                        document.getElementById('home_available_colors').innerHTML = pColors;
                        setActiveClass(document.querySelectorAll('#home_available_colors span'), 'selected', data.message[2]);

                        // SIZES
                        // console.log(data.message[2]);
                        let pCSize = ``;
                        count = 1;
                        data.message[2].forEach((psize) => {
                            // console.log(psize)
                            if(document.querySelector('.available_colors .selected').dataset.color == psize.colour_name){
                                let image = (psize.product_image == null) ? "./images/default.png": "./images/" + psize.product_image;
                                pCSize += `<span class='select_size  ${(count == 1) ? 'selected': ''}' data-size="${psize.size_label}" data-desc="${psize.desc}" data-quantity="${psize.quantity}" data-productcode ="${psize.product_code}"  data-inventory_id ="${psize.inventory_id}" data-product_image="${image}"  data-id ="${psize.id}" >${psize.size_label}</span>`;
                                // pCSize += `<span class='select_size ${(count == 1) ? 'selected': ''}' data-size="${psize.size_label}" data-desc="${psize.desc}" data-quantity="${psize.quantity}" data-productcode ="${psize.product_code}"  data-inventory_id ="${psize.inventory_id}"  data-product_image="${psize.product_image}"  data-id ="${psize.id}"  >${psize.size_label}</span>`;
                                // pCSize += `<span class='select_size ${(count == 1) ? 'selected': ''}' data-size="${psize.size_label}" data-quantity = "${psize.quantity}" data-id ="${psize.size_label}" >${psize.size_label}</span>`;
                                count++;

                            }

                        });
                        document.getElementById('size_list').innerHTML = pCSize;
                        sizeClickAction( data.message[2] );
                        // setActiveClass(document.querySelectorAll('#size_list span'), 'selected', data.message[2]);
                        // getSelected(document.querySelector('#size_list .selected'),  data.message[2]);
                        // GET THE FIRST PRODUCT DETAILS IN THE LIST AND DISPLAY THEMM
                        // console.log(data.message[2][0])
                        document.getElementById('pName').textContent = data.message[2][0].name;
                        document.getElementById('pCategory').textContent = data.message[2][0].category_name;
                        document.getElementById('pProductCode').textContent = data.message[2][0].product_code;
                        document.getElementById('pBrandName').textContent = data.message[2][0].brand_name;
                        document.getElementById('pDesc').textContent = data.message[2][0].desc;
                        document.getElementById('pPrice').textContent = addComma(data.message[2][0].sale_price.toString());
                        document.getElementById('add_cart').dataset.id = data.message[2][0].id;
                        document.getElementById('add_cart').dataset.inventory_id = data.message[2][0].inventory_id;
                        document.getElementById('add_cart').style.backgroundColor = "green";
                        document.querySelector('.remove_quantity').dataset.id = data.message[2][0].id;
                        document.querySelector('.add_quantity').dataset.id = data.message[2][0].id;
                        document.getElementById('item_d_quantity').value = 1;
                        document.getElementById('pImage').setAttribute('src', (data.message[2][0].product_image == null) ? "./images/default.png": "./images/" + data.message[2][0].product_image);

                        productAdjuster(data.message[2]);

                    }
                });
            }));
          
            // CLOSE PRODUCT DETAILS WHEN YOU CLICK ON DARK PART add_cart
            window.addEventListener('click', (e) => {
                if(e.target == document.getElementById('product_full_details')){
                    p_full_details.classList.remove('show');
                }
            });
        })

    })

});
