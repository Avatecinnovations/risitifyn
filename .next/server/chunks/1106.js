"use strict";exports.id=1106,exports.ids=[1106],exports.modules={1323:(t,e)=>{Object.defineProperty(e,"l",{enumerable:!0,get:function(){return function t(e,r){return r in e?e[r]:"then"in e&&"function"==typeof e.then?e.then(e=>t(e,r)):"function"==typeof e&&"default"===r?e:void 0}}})},8141:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return d}});let o=r(5577),n=r(997),i=o._(r(6689)),a=r(5782);async function s(t){let{Component:e,ctx:r}=t;return{pageProps:await (0,a.loadGetInitialProps)(e,r)}}class d extends i.default.Component{render(){let{Component:t,pageProps:e}=this.props;return(0,n.jsx)(t,{...e})}}d.origGetInitialProps=s,d.getInitialProps=s,("function"==typeof e.default||"object"==typeof e.default&&null!==e.default)&&void 0===e.default.__esModule&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)},5364:(t,e,r)=>{r.a(t,async(t,o)=>{try{r.d(e,{z:()=>u});var n=r(997),i=r(6689),a=r(4338),s=r(6926),d=r(7742),l=t([a,s,d]);[a,s,d]=l.then?(await l)():l;let c=(0,s.cva)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),u=i.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...i},s)=>{let l=o?a.Slot:"button";return n.jsx(l,{className:(0,d.cn)(c({variant:e,size:r,className:t})),ref:s,...i})});u.displayName="Button",o()}catch(t){o(t)}})},550:(t,e,r)=>{r.a(t,async(t,o)=>{try{let t;r.d(e,{O:()=>t});var n=r(2885);try{console.log("Initializing Supabase client...");let e="https://risitify.com",r="your-production-anon-key";if(console.log("Supabase URL:",e),console.log("Supabase Anon Key:",r?"Provided":"Missing"),!e||!r)throw Error("Missing Supabase environment variables");t=(0,n.createClient)(e,r,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0,storage:void 0}}),console.log("Testing Supabase connection...");let{data:o,error:i}=await t.auth.getSession();i?console.error("Supabase connection test failed:",i):console.log("Supabase connection test successful"),console.log("Supabase client initialized successfully")}catch(t){throw console.error("Error initializing Supabase client:",t),t}o()}catch(t){o(t)}},1)},6573:(t,e,r)=>{r.d(e,{O:()=>a});var o=r(2885);let n=(void 0).VITE_SUPABASE_URL,i=(void 0).VITE_SUPABASE_ANON_KEY;if(!n||!i)throw Error("Missing Supabase environment variables");let a=(0,o.createClient)(n,i)},7742:(t,e,r)=>{r.a(t,async(t,o)=>{try{r.d(e,{cn:()=>a,x:()=>s});var n=r(6593);!function(){var t=Error("Cannot find module 'tailwind-merge'");throw t.code="MODULE_NOT_FOUND",t}();var i=t([n]);function a(...t){return Object(function(){var t=Error("Cannot find module 'tailwind-merge'");throw t.code="MODULE_NOT_FOUND",t}())((0,n.clsx)(t))}n=(i.then?(await i)():i)[0];let s=(t,e)=>new Intl.NumberFormat("en-US",{style:"currency",currency:e}).format(t);o()}catch(t){o(t)}})},5284:(t,e,r)=>{r.a(t,async(t,o)=>{try{r.d(e,{y:()=>l});var n=r(550),i=r(7742);(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t})(),function(){var t=Error("Cannot find module 'resend'");throw t.code="MODULE_NOT_FOUND",t}();var a=t([n,i]);[n,i]=a.then?(await a)():a;let s=(void 0).VITE_RESEND_API_KEY;console.log("Resend API Key loaded:",s?`${s.substring(0,4)}...`:"Not found"),s||console.error("Resend API key is missing. Please check your .env file.");let d=Object(function(){var t=Error("Cannot find module 'resend'");throw t.code="MODULE_NOT_FOUND",t}())(s),l={async sendInvoiceEmail(t){let{data:{user:e}}=await n.O.auth.getUser();if(!e)throw Error("User not authenticated");let r=this.generateInvoiceEmailTemplate(t),o=await this.generateInvoicePDF(t);try{let{data:n,error:i}=await d.emails.send({from:"Risitify <noreply@risitify.com>",to:t.clients.email,subject:`Invoice #${t.invoice_number} from ${e.email}`,html:r,attachments:[{filename:`invoice-${t.invoice_number}.pdf`,content:o}]});if(i)throw console.error("Resend error:",i),Error(`Failed to send email: ${i.message}`);return n}catch(t){throw console.error("Error in sendInvoiceEmail:",t),t}},generateInvoiceEmailTemplate:t=>`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .invoice-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            .table th,
            .table td {
              padding: 10px;
              border: 1px solid #ddd;
              text-align: left;
            }
            .table th {
              background-color: #f8f9fa;
            }
            .text-right {
              text-align: right;
            }
            .notes {
              margin-top: 30px;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 5px;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Invoice #${t.invoice_number}</h1>
              <p style="margin: 10px 0; color: #666;">Date: ${new Date(t.issue_date).toLocaleDateString()}</p>
              <p style="margin: 0; color: #666;">Due Date: ${new Date(t.due_date).toLocaleDateString()}</p>
            </div>

            <div class="invoice-details">
              <div>
                <h2 style="margin: 0 0 15px 0; font-size: 18px;">Bill To:</h2>
                <p style="margin: 0 0 5px 0; font-weight: 600;">${t.clients.name}</p>
                ${t.clients.email?`<p style="margin: 0 0 5px 0;">${t.clients.email}</p>`:""}
                ${t.clients.address?`<p style="margin: 0 0 5px 0;">${t.clients.address}</p>`:""}
                ${t.clients.city?`<p style="margin: 0 0 5px 0;">${t.clients.city}, ${t.clients.state} ${t.clients.postal_code}</p>`:""}
                ${t.clients.country?`<p style="margin: 0;">${t.clients.country}</p>`:""}
              </div>
              <div>
                <h2 style="margin: 0 0 15px 0; font-size: 18px;">Invoice Details:</h2>
                <p style="margin: 0 0 5px 0;"><strong>Status:</strong> ${t.status}</p>
                <p style="margin: 0 0 5px 0;"><strong>Payment Terms:</strong> Net ${t.payment_terms} days</p>
                <p style="margin: 0 0 5px 0;"><strong>Currency:</strong> ${t.currency}</p>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th class="text-right">Quantity</th>
                  <th class="text-right">Unit Price</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${t.invoice_items.map(e=>`
                  <tr>
                    <td>${e.description}</td>
                    <td class="text-right">${e.quantity}</td>
                    <td class="text-right">${(0,i.x)(e.unit_price,t.currency)}</td>
                    <td class="text-right">${(0,i.x)(e.amount,t.currency)}</td>
                  </tr>
                `).join("")}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right"><strong>Subtotal:</strong></td>
                  <td class="text-right">${(0,i.x)(t.total_amount-t.tax_amount,t.currency)}</td>
                </tr>
                ${t.tax_amount>0?`
                  <tr>
                    <td colspan="3" class="text-right"><strong>Tax (${t.tax_rate}%):</strong></td>
                    <td class="text-right">${(0,i.x)(t.tax_amount,t.currency)}</td>
                  </tr>
                `:""}
                <tr>
                  <td colspan="3" class="text-right"><strong>Total:</strong></td>
                  <td class="text-right">${(0,i.x)(t.total_amount,t.currency)}</td>
                </tr>
              </tfoot>
            </table>

            ${t.notes?`
              <div class="notes">
                <h3 style="margin: 0 0 10px 0; font-size: 16px;">Notes:</h3>
                <p style="margin: 0;">${t.notes}</p>
              </div>
            `:""}

            ${t.terms?`
              <div class="notes">
                <h3 style="margin: 0 0 10px 0; font-size: 16px;">Terms:</h3>
                <p style="margin: 0;">${t.terms}</p>
              </div>
            `:""}

            <div class="footer">
              <p style="margin: 0 0 10px 0;">Thank you for your business!</p>
              <p style="margin: 0;">Please find the attached PDF invoice for your records.</p>
            </div>
          </div>
        </body>
      </html>
    `,async sendQuoteEmail(t){try{let{data:{user:e},error:r}=await n.O.auth.getUser();if(r)throw r;if(!e)throw Error("User not authenticated");let o=await this.generateQuotePDF(t),i=crypto.randomUUID(),a=`${e.id}/${t.quote_number}-${i}.pdf`,{error:s}=await n.O.storage.from("quotes").upload(a,o,{contentType:"application/pdf",cacheControl:"3600",upsert:!1});if(s)throw console.error("Error uploading PDF:",s),Error(`Failed to upload PDF: ${s.message}`);let{data:{publicUrl:d}}=n.O.storage.from("quotes").getPublicUrl(a),l=`Quote #${t.quote_number} from ${e?.user_metadata?.business_name||e?.email||"Your Business"}`,c=`Dear ${t.clients.name},

Please find your quote #${t.quote_number} below.

To download the PDF, click the link below (valid for 1 hour):
${d}

Best regards,
${e?.user_metadata?.business_name||e?.email||"Your Business"}`,u=`mailto:${t.clients.email}?subject=${encodeURIComponent(l)}&body=${encodeURIComponent(c)}`;return window.location.href=u,{success:!0}}catch(t){if(console.error("Error in sendQuoteEmail:",t),t instanceof Error)throw Error(`Failed to prepare email: ${t.message}`);throw t}},generateQuoteEmailTemplate(t){let e=JSON.parse(t.payment_terms||'{"type":"full","percentage":100}'),r="partial"===e.type?t.total_amount*(e.percentage||0)/100:t.total_amount,o=t.total_amount-r;return`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Quote ${t.quote_number}</h2>
        <p>Dear ${t.clients.name},</p>
        <p>Thank you for your interest in our services. Please find the quote details below:</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p><strong>Quote Number:</strong> ${t.quote_number}</p>
          <p><strong>Issue Date:</strong> ${new Date(t.issue_date).toLocaleDateString()}</p>
          <p><strong>Expiry Date:</strong> ${new Date(t.expiry_date).toLocaleDateString()}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Description</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Unit Price</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Tax Rate</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${t.quote_items.map(t=>`
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${t.description}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${t.quantity}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${(0,i.x)(t.unit_price,"USD")}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${t.tax_rate}%</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${(0,i.x)(t.amount,"USD")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="text-align: right;"><strong>Subtotal:</strong> ${(0,i.x)(t.total_amount-t.tax_amount,"USD")}</p>
          <p style="text-align: right;"><strong>Tax:</strong> ${(0,i.x)(t.tax_amount,"USD")}</p>
          <p style="text-align: right;"><strong>Total:</strong> ${(0,i.x)(t.total_amount,"USD")}</p>
          
          ${"partial"===e.type?`
            <p style="text-align: right;"><strong>Initial Payment (${e.percentage}%):</strong> ${(0,i.x)(r,"USD")}</p>
            <p style="text-align: right;"><strong>Remaining Balance:</strong> ${(0,i.x)(o,"USD")}</p>
          `:""}
        </div>

        ${t.notes?`
          <div style="margin: 20px 0;">
            <h3>Notes</h3>
            <p>${t.notes}</p>
          </div>
        `:""}

        ${t.terms?`
          <div style="margin: 20px 0;">
            <h3>Terms & Conditions</h3>
            <p>${t.terms}</p>
          </div>
        `:""}

        <p>Please find the attached PDF for your records.</p>
        <p>Best regards,<br>Your Business</p>
      </div>
    `},async generateQuotePDF(t){let e=await Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}()).create(),r=e.addPage(),{width:o,height:n}=r.getSize(),a=await e.embedFont(Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}()).Helvetica);r.drawText(`Quote #${t.quote_number}`,{x:50,y:n-50,size:20,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText(`Client: ${t.clients.name}`,{x:50,y:n-100,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText(`Email: ${t.clients.email}`,{x:50,y:n-120,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText(`Issue Date: ${new Date(t.issue_date).toLocaleDateString()}`,{x:50,y:n-150,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText(`Expiry Date: ${new Date(t.expiry_date).toLocaleDateString()}`,{x:50,y:n-170,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)});let s=n-220;for(let e of(r.drawText("Description",{x:50,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText("Quantity",{x:250,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText("Unit Price",{x:350,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText("Amount",{x:450,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),s-=20,t.quote_items))r.drawText(e.description,{x:50,y:s,size:10,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText(e.quantity.toString(),{x:250,y:s,size:10,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText((0,i.x)(e.unit_price,t.clients.currency||"USD"),{x:350,y:s,size:10,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),r.drawText((0,i.x)(e.amount,t.clients.currency||"USD"),{x:450,y:s,size:10,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),s-=20;return s-=20,r.drawText(`Subtotal: ${(0,i.x)(t.total_amount-t.tax_amount,t.clients.currency||"USD")}`,{x:350,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),s-=20,r.drawText(`Tax: ${(0,i.x)(t.tax_amount,t.clients.currency||"USD")}`,{x:350,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),s-=20,r.drawText(`Total: ${(0,i.x)(t.total_amount,t.clients.currency||"USD")}`,{x:350,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),t.payment_terms&&(s-=40,r.drawText("Payment Terms:",{x:50,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),s-=20,r.drawText(t.payment_terms,{x:50,y:s,size:10,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)})),t.notes&&(s-=40,r.drawText("Notes:",{x:50,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),s-=20,r.drawText(t.notes,{x:50,y:s,size:10,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)})),t.terms&&(s-=40,r.drawText("Terms:",{x:50,y:s,size:12,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)}),s-=20,r.drawText(t.terms,{x:50,y:s,size:10,font:a,color:Object(function(){var t=Error("Cannot find module 'pdf-lib'");throw t.code="MODULE_NOT_FOUND",t}())(0,0,0)})),await e.save()}};o()}catch(t){o(t)}})},8604:(t,e,r)=>{r.a(t,async(t,o)=>{try{r.d(e,{z:()=>u});var n=r(6573),i=r(5284),a=r(7276),s=r.n(a),d=r(5158),l=r.n(d),c=t([i]);i=(c.then?(await c)():c)[0];let u={async getClients(t){try{let{data:e,error:r}=await n.O.from("clients").select("*").eq("user_id",t).order("created_at",{ascending:!1});if(r)throw r;return e||[]}catch(t){return console.error("Error fetching clients:",t),[]}},async createClient(t){let{data:e,error:r}=await n.O.from("clients").insert([t]).select().single();if(r)throw r;return e},async updateClient(t,e){let{data:r,error:o}=await n.O.from("clients").update(e).eq("id",t).select().single();if(o)throw o;return r},async deleteClient(t){let{error:e}=await n.O.from("clients").delete().eq("id",t);if(e)throw e},async getQuotes(t){let{data:e,error:r}=await n.O.from("quotes").select(`
        *,
        client:clients(id, name),
        quote_items:quote_items(*)
      `).eq("user_id",t).order("created_at",{ascending:!1});if(r)throw r;return e},async createQuote(t){try{if(!t.user_id||!t.client_id)throw Error("User ID and Client ID are required");let e=t.quote_items.reduce((t,e)=>{let r=Number(e.amount)||0;return t+r},0),r=Number(t.tax_rate)||0,o=e*r/100,{data:i,error:a}=await n.O.from("quotes").insert([{user_id:t.user_id,client_id:t.client_id,project_id:t.project_id,quote_number:t.quote_number,status:t.status||"draft",issue_date:t.issue_date,expiry_date:t.expiry_date,subtotal_amount:e,tax_rate:r,tax_amount:o,total_amount:e+o,notes:t.notes||"",terms:t.terms||"",payment_terms:JSON.stringify({type:t.payment_type||"full",percentage:t.payment_percentage||100})}]).select().single();if(a)throw a;if(!i)throw Error("Failed to create quote");if(t.quote_items&&t.quote_items.length>0){let e=t.quote_items.map(t=>({quote_id:i.id,description:t.description||"",quantity:Number(t.quantity)||0,unit_price:Number(t.unit_price)||0,amount:Number(t.amount)||0})),{error:r}=await n.O.from("quote_items").insert(e);if(r)throw r}return i}catch(t){throw console.error("Error creating quote:",t),t}},async getQuoteById(t){let{data:e,error:r}=await n.O.from("quotes").select(`
        *,
        client:clients(*),
        quote_items(*),
        project:projects(*)
      `).eq("id",t).single();if(r)throw r;let o=e.quote_items.reduce((t,e)=>{let r=Number(e.amount)||0;return t+r},0),i=Number(e.tax_rate)||0,a=o*i/100;return{...e,subtotal_amount:o,tax_amount:a,total_amount:o+a}},async updateQuote(t,e){let{data:r,error:o}=await n.O.from("quotes").update(e).eq("id",t).select().single();if(o)throw o;return r},async deleteQuote(t){let{error:e}=await n.O.from("quotes").delete().eq("id",t);if(e)throw e},async getInvoices(t){let{data:e,error:r}=await n.O.from("invoices").select(`
        *,
        client:clients(id, name),
        invoice_items:invoice_items(*)
      `).eq("user_id",t).order("created_at",{ascending:!1});if(r)throw r;return e},async createInvoice(t){let{data:e,error:r}=await n.O.from("invoices").insert([t]).select().single();if(r)throw r;return e},async getInvoiceById(t){let{data:e,error:r}=await n.O.from("invoices").select(`
        *,
        client:clients(*),
        invoice_items:invoice_items(*)
      `).eq("id",t).single();if(r)throw r;return e},async updateInvoice(t,e){let{data:r,error:o}=await n.O.from("invoices").update(e).eq("id",t).select().single();if(o)throw o;return r},async deleteInvoice(t){let{error:e}=await n.O.from("invoices").delete().eq("id",t);if(e)throw e},async getSalesPersons(t){let{data:e,error:r}=await n.O.from("sales_persons").select("*").eq("user_id",t).order("created_at",{ascending:!1});if(r)throw r;return e},async createSalesPerson(t){let{data:e,error:r}=await n.O.from("sales_persons").insert([t]).select().single();if(r)throw r;return e},async updateSalesPerson(t,e){let{data:r,error:o}=await n.O.from("sales_persons").update(e).eq("id",t).select().single();if(o)throw o;return r},async deleteSalesPerson(t){let{error:e}=await n.O.from("sales_persons").delete().eq("id",t);if(e)throw e},async getNextQuoteNumber(t){try{let{data:e,error:r}=await n.O.from("quotes").select("quote_number").eq("user_id",t).order("created_at",{ascending:!1}).limit(1);if(r)throw r;if(!e||0===e.length)return"Q-0001";let o=e[0].quote_number,i=parseInt(o.split("-")[1])+1;return`Q-${i.toString().padStart(4,"0")}`}catch(t){return console.error("Error getting next quote number:",t),"Q-0001"}},async sendInvoice(t){let e=await this.getInvoiceById(t);if(!e)throw Error("Invoice not found");let{error:r}=await i.y.sendInvoiceEmail(e);if(r)throw r;await this.updateInvoice(t,{status:"sent"})},async downloadInvoicePDF(t){if(!await this.getInvoiceById(t))throw Error("Invoice not found");let e=document.getElementById("invoice-pdf");if(!e)throw Error("Invoice PDF element not found");let r=await s()(e),o=new(l())("p","mm","a4"),n=r.toDataURL("image/png"),i=o.internal.pageSize.getWidth(),a=r.height*i/r.width;return o.addImage(n,"PNG",0,0,i,a),o.output("arraybuffer")},async sendQuoteEmail(t){try{let{data:e,error:r}=await n.O.from("quotes").select(`
          *,
          clients:client_id (
            id,
            name,
            email,
            address,
            city,
            state,
            postal_code,
            country
          ),
          quote_items:quote_items (
            id,
            description,
            quantity,
            unit_price,
            tax_rate,
            amount
          )
        `).eq("id",t).single();if(r)throw r;if(!e)throw Error("Quote not found");if(!e.clients)throw Error("Client information not found");if(!e.clients.email)throw Error("Client email is required");let o=e.quote_items.reduce((t,e)=>t+e.amount,0),a=e.tax_rate/100*o,s={...e,total_amount:o+a,tax_amount:a,quote_items:e.quote_items,clients:e.clients},d=await i.y.sendQuoteEmail(s),{error:l}=await n.O.from("quotes").update({status:"sent"}).eq("id",t);return l&&console.error("Failed to update quote status:",l),d}catch(t){if(console.error("Error in sendQuoteEmail:",t),t instanceof Error)throw Error(`Failed to send email: ${t.message}`);throw t}},async getOrganizations(){let{data:t,error:e}=await n.O.from("organizations").select("*").order("created_at",{ascending:!1});if(e)throw e;return t},async createOrganization(t){let{data:e,error:r}=await n.O.from("organizations").insert([t]).select().single();if(r)throw r;return e},async updateOrganization(t,e){let{data:r,error:o}=await n.O.from("organizations").update(e).eq("id",t).select().single();if(o)throw o;return r},async deleteOrganization(t){let{error:e}=await n.O.from("organizations").delete().eq("id",t);if(e)throw e},async getOrganizationById(t){let{data:e,error:r}=await n.O.from("organizations").select("*").eq("id",t).single();if(r)throw r;return e}};o()}catch(t){o(t)}})},5244:(t,e)=>{var r;Object.defineProperty(e,"x",{enumerable:!0,get:function(){return r}}),function(t){t.PAGES="PAGES",t.PAGES_API="PAGES_API",t.APP_PAGE="APP_PAGE",t.APP_ROUTE="APP_ROUTE"}(r||(r={}))}};