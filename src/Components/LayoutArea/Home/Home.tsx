import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">

			<h1>Welcome to my Coupon System!</h1>

            <p>
                This site supports the following Clients: Customer, Company and Administrator<br /><br /><br />

                <span>Each Client has its own unique Menu as follows:</span>
            </p>

            <br /><br />

            <div>
                <h2>
                    <span>Customer</span><br />

                    Front page includes Account Details and a List of their Purchased Coupons.<br />
                    Customer may purchase a Coupon by browsing the store selecting the desired Coupon.
                </h2>
                <h2>
                    <span>Company</span><br />

                    Front page includes Coupon Addition, Account Details and a List of its Created Coupons.<br />
                    A Company may Update/Delete a Coupon while viewing its Details page.
                </h2>
                <h2>
                    <span>Administrator</span><br />
                    
                    Front page includes options to Add/Delete/View all Existing Companies/Customers.<br />
                    Administrator may also Update/Delete a Company/Customer while viewing their Details page.
                </h2>
            </div>

        </div>
    );
}

export default Home;
