function addItem() {
    const container = document.getElementById('itemsContainer');
    const rowCount = document.getElementsByClassName('item-row').length + 1;
    const row = document.createElement('div');
    row.className = 'item-row grid grid-cols-12 gap-2 items-center bg-slate-50 p-3 rounded-lg border border-slate-100';
    row.innerHTML = `
        <input type="text" class="item-no col-span-1 text-center bg-white border border-slate-200 rounded py-1 text-sm" placeholder="No." value="${rowCount}">
        <input type="text" class="item-name col-span-4 bg-white border border-slate-200 rounded py-1 px-2 text-sm" placeholder="Item Name">
        <input type="text" class="item-color col-span-2 bg-white border border-slate-200 rounded py-1 px-2 text-sm" placeholder="Color">
        <input type="number" class="item-qty col-span-1 text-center bg-white border border-slate-200 rounded py-1 text-sm" placeholder="Qty" value="1">
        <input type="number" class="item-price col-span-3 text-right bg-white border border-slate-200 rounded py-1 px-2 text-sm" placeholder="Price">
        <button class="col-span-1 text-rose-500 hover:bg-rose-50 rounded py-1 transition-colors" onclick="removeItem(this)">✕</button>
    `;
    container.appendChild(row);
}

function removeItem(btn) {
    if (document.getElementsByClassName('item-row').length > 1) {
        btn.parentElement.remove();
    } else {
        alert("At least one item is required.");
    }
}

function generateVoucher() {
    const customer = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const itemNos = document.getElementsByClassName('item-no');
    const itemNames = document.getElementsByClassName('item-name');
    const colors = document.getElementsByClassName('item-color');
    const qtys = document.getElementsByClassName('item-qty');
    const prices = document.getElementsByClassName('item-price');
    
    let total = 0;
    let tableBody = '';
    
    for (let i = 0; i < itemNames.length; i++) {
        const no = itemNos[i].value || (i + 1);
        const name = itemNames[i].value;
        const color = colors[i].value;
        const qty = parseFloat(qtys[i].value) || 0;
        const price = parseFloat(prices[i].value) || 0;
        const subtotal = qty * price;
        
        if (name) {
            tableBody += `
                <tr class="border-b border-slate-50">
                    <td class="py-4 px-2 font-mono text-xs text-slate-400">${no}</td>
                    <td class="py-4 px-2">
                        <div class="font-bold text-slate-800">${name}</div>
                        ${color ? `<div class="text-[10px] text-slate-400 uppercase font-bold">${color}</div>` : ''}
                    </td>
                    <td class="py-4 px-2 text-center font-bold">${qty}</td>
                    <td class="py-4 px-2 text-right text-slate-500">${price.toLocaleString()}</td>
                    <td class="py-4 px-2 text-right font-black text-slate-800">${subtotal.toLocaleString()}</td>
                </tr>
            `;
            total += subtotal;
        }
    }
    
    // Set Values
    document.getElementById('vCustomer').innerText = customer || 'General Customer';
    document.getElementById('vPhone').innerText = phone || 'N/A';
    document.getElementById('vAddress').innerText = address || 'No Address Provided';
    
    // Set Date (Formatted)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('vDate').innerText = new Date().toLocaleDateString('en-US', options);
    
    // Generate Random Invoice ID
    const randomId = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('vInvoiceId').innerText = `#${randomId}`;
    
    document.getElementById('vBody').innerHTML = tableBody;
    document.getElementById('vTotal').innerText = total.toLocaleString();
    
    // Show Output
    const output = document.getElementById('voucherOutput');
    output.classList.remove('hidden');
    
    // Smooth scroll to voucher
    output.scrollIntoView({ behavior: 'smooth' });
}
