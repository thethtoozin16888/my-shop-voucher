function addItem() {
    const container = document.getElementById('itemsContainer');
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
        <select class="item-cat">
            <option value="Tech">Tech</option>
            <option value="Skincare">Skincare</option>
        </select>
        <input type="text" class="item-name" placeholder="Item name">
        <input type="number" class="item-qty" placeholder="Qty" value="1">
        <input type="number" class="item-price" placeholder="Price">
        <button class="remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(row);
}

function removeItem(btn) {
    btn.parentElement.remove();
}

function generateVoucher() {
    const customer = document.getElementById('customerName').value;
    const cats = document.getElementsByClassName('item-cat');
    const itemNames = document.getElementsByClassName('item-name');
    const qtys = document.getElementsByClassName('item-qty');
    const prices = document.getElementsByClassName('item-price');
    
    let total = 0;
    let tableBody = '';
    
    for (let i = 0; i < itemNames.length; i++) {
        const cat = cats[i].value;
        const name = itemNames[i].value;
        const qty = parseFloat(qtys[i].value) || 0;
        const price = parseFloat(prices[i].value) || 0;
        const subtotal = qty * price;
        
        if (name) {
            tableBody += `
                <tr>
                    <td>[${cat}] ${name}</td>
                    <td>${qty}</td>
                    <td>${price}</td>
                    <td>${subtotal}</td>
                </tr>
            `;
            total += subtotal;
        }
    }
    
    document.getElementById('vCustomer').innerText = customer || 'Walk-in Customer';
    document.getElementById('vDate').innerText = new Date().toLocaleDateString();
    document.getElementById('vBody').innerHTML = tableBody;
    document.getElementById('vTotal').innerText = total.toLocaleString();
    
    document.getElementById('voucherOutput').classList.remove('hidden');
}
