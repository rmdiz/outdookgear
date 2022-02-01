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

    console.log(activeView);

    let view = new activeView.page.view();
    if(activeView.page.path !="?pg=signin"){
        if(document.querySelector('main') == null){
            const main = document.createElement('main');
            document.querySelector('body').prepend(main);
        }
        document.querySelector('main').innerHTML = await view.getPage();

    }else{
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
                        alert(data.message);

                    }else{
                        console.log(data);
                        document.getElementById('logedin_user').textContent = data.message.first_name;
                        document.getElementById('logedin_user').dataset.user_id = data.message.user_id;
                        document.querySelector('.sign-in-container').classList.add('hide');
                        navigateTo('index.html?pg=dashboard');
                    }
                });
            }else{
                alert('username and password required')
            }
        })
    }
    // console.log(activeView.page.view);

    switch(activeView.page.path.split('=')[1]){
        case 'home':
            let homeProducts = await view.getInventoryProducts();
            console.log(homeProducts.message);
            if(homeProducts.response == "success"){
                let homePNames = [];
                let homePs = [];
                homeProducts.message.forEach((product) => {

                    // console.log(titleCase(product.name)) 
                    if(!homePNames.includes(titleCase(product.name))){
                        homePNames.push(titleCase(product.name));

                        // console.log(titleCase(product.name))

                        let productInfo = {
                            id: product.id,
                            name:  titleCase(product.name),
                            sale_price: addComma(product.sale_price),
                            brand_name: product.brand_name,
                            size_label: product.size_label,
                            product_image: (product.product_image == null) ? "default.png": product.product_image
                        }
                        homePs.push(productInfo);
                    }
                });
                homeProducts = await view.addHomeProduct(homePs, document.querySelector('.product_display'));

                // ADD CLICK EVENT TO ADD TO CART BUTTON select_color
                addToCartEvent(view);
            }

            if(document.querySelector('.p_full_details') == null){
                const p_full_details = document.createElement('section');
                p_full_details.classList.add('p_full_details');
                p_full_details.setAttribute('id', 'product_full_details');
                document.querySelector('main').after(p_full_details);
            }
                const p_full_details = document.querySelector('.p_full_details');

            // GET ELEMENTS IN REGUARD TO PRODUCT DETAILS
            const p_details = document.querySelectorAll('.p_details');

            // ONCLICK SHOW PRODUCT DETAILS
            p_details.forEach((p_detail) => p_detail.addEventListener('click', () => {
                console.log(p_detail.dataset.product);
                // ------------------------------------
                console.log(p_detail.dataset.id);
                p_full_details.classList.toggle('show');
                    let site = getLocalData();
                    if(Object.keys(site).length !=0){
                        let inventory_list = site.fetch_all_inventory_products;
                        let available_colors = {};
                        let available_size = [];
                        let product_info = {};
                        Object.keys(inventory_list).forEach((inventory_product) => {
                            console.log(inventory_product)
                            if(p_detail.dataset.product == titleCase(inventory_list[inventory_product].name)){
                                product_info[inventory_list[inventory_product].colour_name] = inventory_list[inventory_product]
                                console.log(inventory_list[inventory_product]);
                                if(!Object.keys(available_colors).includes(inventory_list[inventory_product].colour_name)){
                                    console.log(inventory_list[inventory_product].id);
                                    available_colors[inventory_list[inventory_product].colour_name] = inventory_list[inventory_product].id;
                                }
                                if(!available_size.includes(inventory_list[inventory_product].size_label)){
                                    available_size.push(inventory_list[inventory_product].size_label);
                                }
                            }
                            if(p_detail.dataset.id == inventory_list[inventory_product].product_id){
                                p_full_details.innerHTML = view.getPFDetails(product_info);
                            }
                        })
                        console.log(product_info, available_size, available_colors);
                        console.log(product_info)
                        p_full_details.innerHTML = view.getPFDetails(product_info);
                        document.getElementById('pPrice').textContent = addComma(document.getElementById('pPrice').textContent);
                        const closeP_details = document.getElementById('closeP_details');
                        // ON CLIK HIDE THE PRODUCT DETAILS
                        closeP_details.addEventListener('click', () => {
                            p_full_details.classList.toggle('show');
                        });

                        let colorContent = "<b>Select Color</b>";;
                        let count = 1;
                        Object.keys(available_colors).forEach((color) => {
                            colorContent += `
                                <span ${(count == 1) ? "class='selected select_color'": "class='select_color'"} data-color="${color}" data-id ="${available_colors[color]}">${color}</span>
                            `;
                            count++;
                        });
                        document.getElementById('home_available_colors').innerHTML = colorContent;

                        let sizeContent = "<b>Select size</b>";
                        let counter = 1;
                        available_size.forEach((size) => {
                            sizeContent += `
                                <span ${(counter == 1) ? "class='selected'": ""} data-size="${size}" >${size}</span>
                            `;
                            counter++;
                        });
                        sizeContent += `
                            <label class="quantity_adjuster">
                                <a href="#" class="remove_quantity" data-id="${document.querySelector('.available_colors .selected').dataset.id}">
                                    <i class="las la-minus"></i>
                                </a>
                                <input type="text" name="" id="item_d_quantity" value="1">
                                <a href="#" class="add_quantity" data-id="${document.querySelector('.available_colors .selected').dataset.id}">
                                    <i class="las la-plus"></i>
                                </a>
                            </label>
                        `;
                        document.getElementById('home_available_size').innerHTML = sizeContent;
                        sizeSelect();
                        // console.log(colorContent)
                        const available_colors_span = document.querySelectorAll('.available_colors span');
                        available_colors_span.forEach((color) => color.addEventListener('click', () => {
                            available_colors_span.forEach((allcolor) => allcolor.classList.remove('selected'));
                            color.classList.toggle('selected');
                        }));
                        addToCartEvent(view);
                        let currentP = document.querySelector('.available_colors .selected').dataset.id;
                        document.querySelectorAll('.select_color').forEach((select_color) => {
                            select_color.addEventListener('click', () => {
                                console.log(inventory_list);
                                productFDInfoBC(inventory_list);
                                let sizeContent = "<b>Select size</b>";
                                let counter = 1;
                                Object.keys(inventory_list).forEach((inventory_product) => {
                                    if(inventory_list[inventory_product].colour_name == select_color.dataset.color){
                                        console.log(inventory_list[inventory_product]);
                                        document.getElementById('pName').textContent = inventory_list[inventory_product].name;
                                        document.getElementById('pCategory').textContent = inventory_list[inventory_product].category_name;
                                        document.getElementById('pProductCode').textContent = inventory_list[inventory_product].product_code;
                                        document.getElementById('pBrandName').textContent = inventory_list[inventory_product].brand_name;
                                        document.getElementById('pImage').setAttribute('src', "./images/" + inventory_list[inventory_product].product_image);
                                        document.getElementById('pDesc').textContent = inventory_list[inventory_product].desc;
                                        document.getElementById('pPrice').textContent = addComma(inventory_list[inventory_product].sale_price);
                                        document.getElementById('add_cart').dataset.id = inventory_list[inventory_product].id;
                                        document.getElementById('add_cart').style.backgroundColor = "green";
                                        sizeContent += `
                                            <span ${(counter == 1) ? "class='selected'": ""} data-size="${inventory_list[inventory_product].size_label}" >${inventory_list[inventory_product].size_label}</span>
                                        `;
                                        counter++;

                                        document.querySelector('.remove_quantity').dataset.id = inventory_list[inventory_product].id;
                                        document.querySelector('.add_quantity').dataset.id = inventory_list[inventory_product].id;

                                        currentP = inventory_list[inventory_product].id;

                                    }
                                });
                                sizeContent += `
                                    <label class="quantity_adjuster">
                                        <a href="#" class="remove_quantity" data-id="${inventory_list[currentP].id}">
                                            <i class="las la-minus"></i>
                                        </a>
                                        <input type="text" name="" id="item_d_quantity" value="1">
                                        <a href="#" class="add_quantity" data-id="${inventory_list[currentP].id}">
                                            <i class="las la-plus"></i>
                                        </a>
                                    </label>
                                `;
                                document.getElementById('home_available_size').innerHTML = sizeContent;

                                // document.querySelector('.p_full_details').innerHTML = view.getPFDetails(product_info);
                                // document.getElementById('home_available_colors').innerHTML = colorContent;
                                // select_color.classList.toggle("active"); cartAdd
                                productAdjuster();

                                sizeSelect();

                            });
                        });

                        productAdjuster();
                    }
                    
                
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
            console.log(availablebrands.message)
            res = await addAssideComponets(availablebrands.message, document.getElementById('home_brands'));
            let availablecategories = await view.getCategories();
            res = await addAssideComponets(availablecategories.message, document.getElementById('home_categories'));
            let availablecolors = await view.getColors();
            res = await addAssideComponets(availablecolors.message, document.getElementById('home_colors'));

        break;

        case 'products':
            // SHOW INVENTORY LIST
            let inventory = await view.getInventory();
            console.log(inventory)
            inventory = await view.addInventory(inventory.message, document.getElementById('inventory_items'));
            // SHOW PRODUCT LIST
            let products = await view.getProducts();
            products = await view.addProduct(products.message, document.getElementById('product_items'));
            // GET ALL NECESSARY DATA IN REGARD TO PRODUCTS
            let requestResponse = await view.getBrands();
            requestResponse = await view.getBranches();
            requestResponse = await view.getCategories();
            requestResponse = await view.getDiscounts();
            requestResponse = await view.getStatus();
            requestResponse = await view.getColors();
            requestResponse = await view.getSuppliers();
            requestResponse = await view.getSizes();
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

                let products = site.fetch_all_products;
                let brands = site.fetch_all_brands;
                let branches = site.fetch_all_branches;
                let categories = site.fetch_all_categories;
                let discounts = site.fetch_all_discounts;
                let statuses = site.fetch_all_status;
                let sizes = site.fetch_all_sizes;
                let colors = site.fetch_all_colors;
                let suppliers = site.fetch_all_suppliers;

                    // INVENTORY
                // ADD DROPDOWNS TO SELECT ELEMENTS IN POPUPS
                document.getElementById('add_inventory_product_code').innerHTML =  generateDropdown(products, 'product_code', 'product_code', "Choose product Code");
                let productNameArr = [];
                Object.keys(products).forEach((productDetails) => {
                    if(!productNameArr.includes(products[productDetails].name.toLowerCase())){
                        productNameArr.push(products[productDetails].name.toLowerCase());
                    }
                });
                let product_names = [];
                productNameArr.forEach((productName) => {
                    product_names.push({name:  titleCase(productName)})
                })
                // console.log(product_names)
                document.getElementById("add_inventory_product_name").innerHTML = generateDropdown(product_names, 'name', 'name', 'Choose product name');
                document.getElementById("add_inventory_category").innerHTML = generateDropdown(categories, 'name', 'id', 'Choose product category');
                document.getElementById("add_inventory_branch").innerHTML = generateDropdown(branches, 'name', 'id', 'Choose inventory branch');
                document.getElementById("add_inventory_brand").innerHTML = generateDropdown(brands, 'name', 'id', 'Choose product brand');
                document.getElementById("add_inventory_discount").innerHTML = generateDropdown(discounts, 'name', 'id', 'Choose product discount');
                document.getElementById("add_inventory_status").innerHTML = generateDropdown(statuses, 'name', 'id', 'Choose inventory status');
                
                // DROPDOWN SELECTIONS
                document.getElementById('add_inventory_product_name').addEventListener('click', () => {
                    findCorespondingProductCodes(products, document.getElementById('add_inventory_product_name').value);

                });
                document.getElementById('add_inventory_product_code').addEventListener('click', () => {
                    // console.log(document.getElementById('add_inventory_product_code').value)
                    findCorespondingValue(products, document.getElementById('add_inventory_product_code').value);

                });


                // let brands = site.fetch_all_brands;
                // let categories = site.fetch_all_categories;

                // PRODUCT

                document.getElementById("create_product_category").innerHTML = generateDropdown(categories, 'name', 'id', 'Choose product category');
                document.getElementById("create_product_brand").innerHTML = generateDropdown(brands, 'name', 'id', 'Choose product brand');
                document.getElementById("create_product_color").innerHTML = generateDropdown(colors, 'name', 'id', 'Choose product color');
                document.getElementById("create_product_size").innerHTML = generateDropdown(sizes, 'name', 'id', 'Choose product size');
                document.getElementById("create_product_supplier").innerHTML = generateDropdown(suppliers, 'name', 'id', 'Choose product supplier');

            }
        // response.always(function(data){
            // if(requestResponse.response == "success"){
                // console.log(requestResponse);
            // }
            // });
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
                            navigateTo('index.html?pg=products');
                            
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
                        document.getElementById("create_product_buy_price").value = addComma(data.message[0].buy_price);
                        document.getElementById("create_product_sale_price").value = addComma(data.message[0].sale_price);
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
                            // navigateTo('index.html?pg=products');

                                
                        });
                    });
                });
            });


            // ADD NEW INVENTORY PRODUCT 
            document.getElementById('add_inventory').addEventListener('click', () => {
                // console.log('clicked');
                document.querySelector('.popups').classList.add('active');
                document.querySelector('.product_in').classList.remove('active');
                document.querySelector('.inventory_in').classList.add('active');


                if(localStorage.getItem('outdoorgear')){
                   
                }

                // CREATE INVENTORY SUBMITION
                document.querySelector('.inventory_in').addEventListener('submit', (e) => {
                    e.preventDefault();
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
                            document.querySelector('.popups').classList.remove('active')
                            navigateTo('index.html?pg=products');
                            
                        });

                    }
                })


            });
            
        break;

        case 'signin':
            
        break;

        default:
            console.log('Not yet set');
           


    }

}
const generateReceipt = (cart_items) => {
    
    let allItems = '';
    let totalPrice = 0;
    Object.keys(cart_items).forEach((cart_item) => {
    // console.log(cart_items[cart_item]);
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
                    <span class="item_price">${addComma(cart_items[cart_item].price)}<small>/=</small></span>
                </td>
                <td>
                    <span class="item_total">${addComma((Number(cart_items[cart_item].price) * Number(cart_items[cart_item].quantity)).toString())}<small>/=</small></span>
                </td>
            </tr>
        `;

        totalPrice += Number(cart_items[cart_item].price) * Number(cart_items[cart_item].quantity);
    })
    document.getElementById('receipt_items').innerHTML = allItems;
    // outlet
    // invoice_no
    // let d = new Date();
    // console.log(d.get)
    document.getElementById('invoice_date').innerHTML = "<b>Date</b>: 29/01/2022 3:45:23 PM";
    // payType
    document.getElementById('totalPrice').textContent = addComma(totalPrice.toString());
    document.getElementById('receipt_attendant').textContent = getLocalData().sessions[document.getElementById('logedin_user').dataset.user_id].first_name;
}
const sizeSelect = () =>{
    const available_size_span = document.querySelectorAll('.available_size span');
    available_size_span.forEach((size) => size.addEventListener('click', () => {
        available_size_span.forEach((allsizes) => allsizes.classList.remove('selected'));
        size.classList.toggle('selected');
        document.getElementById('add_cart').style.backgroundColor = "green";
    }));
}
const productAdjuster = () => {
    // GET PRODUCT ADJUSTERS AND QUANTITY
    const remove_quantity = document.querySelectorAll('.remove_quantity');
    const add_quantity = document.querySelectorAll('.add_quantity');
    const item_d_quantity = document.getElementById('item_d_quantity');


    add_quantity.forEach((add_quantity_btn) => add_quantity_btn.addEventListener('click', (e) => {
        e.preventDefault();
        let currentValue = document.getElementById('item_d_quantity').value;
        document.getElementById('item_d_quantity').value = Number(currentValue) + 1;
        setCartItem();

    }));
    remove_quantity.forEach((add_quantity_btn) => add_quantity_btn.addEventListener('click', (e) => {
        e.preventDefault();
        let currentValue = document.getElementById('item_d_quantity').value;
        document.getElementById('item_d_quantity').value = (Number(currentValue) == 0) ? 0 : Number(currentValue) - 1;
        setCartItem();
    }));

    // ADD TO CART
    document.getElementById('add_cart').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('add_cart').style.backgroundColor = "gray";
        let keyEnd = document.querySelector('#home_available_size .selected').dataset.size;

        let product_details = setCartItem();
        console.log(product_details);
        let site = getLocalData();
        site.cart[document.getElementById('add_cart').dataset.id + '-' + keyEnd] = product_details ;
        localStorage.setItem('outdoorgear', JSON.stringify(site));
        document.querySelector("#showCart sup").textContent = Object.keys(site.cart).length;
        generateCart();
        generateReceipt(site.cart);

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
            generateCart();
            generateReceipt(response.cart);
        });
    });

});
}
const setCartItem = () => {

    // GET PRODUCT INFORMAION
    if(localStorage.getItem('outdoorgear')){
        var site = JSON.parse(localStorage.getItem('outdoorgear'));
        let product_info = site.fetch_all_inventory_products[document.querySelector('#add_cart').dataset.id];
        let product_details = {
            'id': document.querySelector('#add_cart').dataset.id,
            'product_code': product_info.product_code,
            'name': product_info.name,
            'brand': product_info.brand_name,
            'size': document.querySelector('.available_size span.selected').dataset.size,
            'color': document.querySelector('.available_colors span.selected').dataset.color,
            'image': product_info.product_image,
            'quantity': document.getElementById('item_d_quantity').value,
            'price': product_info.sale_price,
        }
        console.log(product_details);

        return product_details;

    }
}
const removeItemFromCart =(key) =>{
    let site = getLocalData();
    delete site.cart[key]; 
    localStorage.setItem('outdoorgear', JSON.stringify(site));
    generateCart();
}
const updateCart = (key, updateData) =>{
    console.log(updateData.price)
    let site = getLocalData();
    let productDetails = site.fetch_all_inventory_products[key.split('-')[0]];
    console.log(productDetails)
    if(typeof(site.cart[key]) == "object"){
        let cart_details = {
            'id': productDetails.id,
            'product_code': productDetails.product_code,
            'name': productDetails.name,
            'brand': productDetails.brand_name,
            'color': productDetails.colour_name,
            'size': productDetails.size_label,
            'image': productDetails.product_image,
            'quantity': updateData.quantity,
            'price': removeComma(updateData.price).split("@")[1],
        }
        console.log(cart_details)
        site.cart[key] = cart_details ;
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
    `;
    if(localStorage.getItem('outdoorgear')){
        let cart = getLocalData().cart;
        document.querySelector("#showCart sup").textContent = Object.keys(cart).length;

        console.log(cart);
        if(Object.keys(cart).length > 0){
            let count = 1;
            Object.keys(cart).forEach((cart_item) => {
                console.log(cart[cart_item])
                cartSect += `

                <div class="cart_items">
                    <div class="cart_item">
                        <span>${count}</span>
                        <div class="p_info">
                            <span><img src="./images/${cart[cart_item].image}"></span>
                            <span>
                                <small><b>Name: </b> ${cart[cart_item].name}</small>
                                <small><b>Brand: </b> ${cart[cart_item].brand}</small>
                                <small><b>Color: </b> ${cart[cart_item].color}</small>
                                <small><b>Size: </b> ${cart[cart_item].size}</small>
                            </span>
                        </div>
                        <span>
                            <label>
                                <a href="#" class="cartAdd" data-id="${cart[cart_item].id + '-' + cart[cart_item].size}"><i class="las la-plus"></i></a>
                                <input type="text" name="" value="${cart[cart_item].quantity}" id="${cart[cart_item].id + '-' + cart[cart_item].size}quantity">
                                <a href="#" class="cartRemove" data-id="${cart[cart_item].id + '-' + cart[cart_item].size}"><i class="las la-minus"></i></a>
                            </label>
                        </span>
                        <span>
                            <label>
                                <input type="text" name="" class="cart_price" data-id="${cart[cart_item].id + '-' + cart[cart_item].size}" id="${cart[cart_item].id + '-' + cart[cart_item].size}price" value="@${addComma(cart[cart_item].price)}">
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

                <div class="cart_info">
                    <h2>Billing details</h2>
                    <div class="customer_info">
                        <input type="text" name="" placeholder="customer First name">
                        <input type="text" name="" placeholder="customer last name">
                        <input type="text" name="" placeholder="customer email">
                        <input type="text" name="" placeholder="customer telephone">
                    </div>
                    <div class="sale_info">
                        <div class="header">
                            <span><i class="las la-trash-alt"></i><b>Clear List</b></span>
                            <span><i class="las la-plus"></i><b>Add Item</b></span>
                            <span><i class="las la-plus"></i><b>Add Payment Type</b></span>
                            <span><i class="las la-plus"></i><b>Add Discount</b></span>
                        </div>
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


        document.querySelectorAll('.remove_from_cart i').forEach((removeBtn) => {
            removeBtn.addEventListener('click', () => {
                console.log(removeBtn.dataset.id);
                removeItemFromCart(removeBtn.dataset.id)
            });
        });
        // GET PRODUCT ADJUSTERS AND QUANTITY
        const cartAdd = document.querySelectorAll('.cartAdd');
        const cartRemove = document.querySelectorAll('.cartRemove');
        cartAdd.forEach((add_quantity_btn) => add_quantity_btn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentValue = document.getElementById(add_quantity_btn.dataset.id + 'quantity').value;
            // console.log(currentValue)
            document.getElementById(add_quantity_btn.dataset.id + 'quantity').value = Number(currentValue) + 1;
            updateCart(add_quantity_btn.dataset.id, {
                'quantity': document.getElementById(add_quantity_btn.dataset.id + 'quantity').value, 
                'price': document.getElementById(add_quantity_btn.dataset.id + "price").value
            });
        }));
        cartRemove.forEach((remove_quantity_btn) => remove_quantity_btn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentValue = document.getElementById(remove_quantity_btn.dataset.id + 'quantity').value;
            // console.log(currentValue)
            document.getElementById(remove_quantity_btn.dataset.id + 'quantity').value = (Number(currentValue) == 1) ? 1 : Number(currentValue) - 1;
            updateCart(remove_quantity_btn.dataset.id, {
                'quantity': document.getElementById(remove_quantity_btn.dataset.id + 'quantity').value, 
                'price': document.getElementById(remove_quantity_btn.dataset.id + "price").value
            });
        }));
        const cart_price = document.querySelectorAll('.cart_price');
        cart_price.forEach((priceInput) => {
            priceInput.addEventListener('change', () => {
                document.getElementById(priceInput.dataset.id + 'quantity').value = removeComma(document.getElementById(priceInput.dataset.id + 'quantity').value);
                updateCart(priceInput.dataset.id, {
                    'quantity': document.getElementById(priceInput.dataset.id + 'quantity').value, 
                    'price': priceInput.value
                });
            });
        })
    }
    if(document.getElementById('receipt_preview')){
        document.getElementById('receipt_preview').addEventListener('click', () => {
            generateReceipt(getLocalData().cart)
            document.querySelector('.receipt_overlay').classList.add('active');
        });
    }

    window.addEventListener('click', (e) => {
        if(e.target == document.querySelector('.receipt_overlay')){
            document.querySelector('.receipt_overlay').classList.remove('active');

        }
    });
    if(document.getElementById('checkout_btn')){
        document.getElementById('checkout_btn').addEventListener('click', () => {
            generateReceipt(getLocalData().cart)
            print();
        });
    }




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
            document.querySelector('.cart_section').classList.toggle('show');
        });
    }

    if(document.getElementById('product_full_details')){
        document.getElementById('product_full_details').classList.remove('show');
    }
}
const addAssideComponets = async (itemList, itemElement) => {
    let listItems = '';
    itemList.forEach((item) => {
        listItems += `
            <li class="aside_item">
                <span>${item.name}</span>
                <small>32</small>
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
    Object.keys(products).forEach((product) => {
        if(products[product].name.toLowerCase() == valueToFind.toLowerCase()){
            product_codeArr.push({product_code:  products[product].product_code});
        }
    });
    document.getElementById('add_inventory_product_code').innerHTML =  generateDropdown(product_codeArr, 'product_code', 'product_code', "Choose product Code");

    // console.log(product_codeArr);
}
const findCorespondingValue = (products, valueToFind) => {
    console.log(products);
    Object.keys(products).forEach((product) => {

        if(products[product].product_code == valueToFind){
            // console.log(products[product].product_code);
            document.getElementById('add_inventory_product_code').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_product_name'), titleCase(products[product].name));
            document.getElementById('add_inventory_product_name').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_category'), products[product].category_id);
            document.getElementById('add_inventory_category').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_brand'), products[product].brand_id);
            document.getElementById('add_inventory_brand').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_discount'), 5);
            document.getElementById('add_inventory_discount').style.borderColor = 'green';
            setSelectedValue(document.getElementById('add_inventory_status'), 3);
            document.getElementById('add_inventory_status').style.borderColor = 'green';

            document.getElementById('add_inventory_buy_price').value = addComma(products[product].buy_price);
            document.getElementById('add_inventory_buy_price').style.borderColor = 'green';
            document.getElementById('add_inventory_sale_price').value = addComma(products[product].sale_price);
            document.getElementById('add_inventory_sale_price').style.borderColor = 'green';

            document.getElementById('add_inventory_product_id').value = products[product].id;

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

    const cart_section = document.querySelector('.cart_section');
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
        cart_section.classList.toggle('show');
    })
    generateCart();
    // p_details.forEach((p_detail) => p_detail.addEventListener('click', () => {
    //     p_full_details.classList.toggle('show');
    // }));
    // closeP_details.addEventListener('click', () => {
    //     p_full_details.classList.toggle('show');
    // })
    

});





// $.ajax({
//     url: "http://localhost/outdoorgear/api/route.php",
//     type: "POST",
//     dataType  : 'json',
//     data: {
//     'action':'fetch_all_products'
//     },
//     success: function(data) {
//         // console.log(data);  
//     }
// });