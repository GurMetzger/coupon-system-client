import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import DeleteModel, { DeleteType } from "../../../Models/DeleteModel";
import { companyDeletedAction } from "../../../Redux/CompaniesState";
import { couponsDeletedAction } from "../../../Redux/CouponsState";
import { customerDeletedAction } from "../../../Redux/CustomersState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./DeleteButton.css";

interface DeleteButtonProps {
    deleteModel: DeleteModel;
}

function DeleteButton(props: DeleteButtonProps): JSX.Element {

    const history = useHistory();

    async function handleClick() {
        try {

            switch (props.deleteModel.deleteType) {

                case DeleteType.Company:

                    const responseCompany = await jwtAxios.delete(globals.urls.deleteCompany + props.deleteModel.id);
                    const deletedCompanyID = responseCompany.data;
    
                    store.dispatch(companyDeletedAction(deletedCompanyID))
                    notify.success("Company with ID '" + props.deleteModel.id + "' was successfully deleted!");

                    history.push("/admin");
                    break;

                case DeleteType.Customer:

                    const responseCustomer = await jwtAxios.delete(globals.urls.deleteCustomer + props.deleteModel.id);
                    const deletedCustomerID = responseCustomer.data;
    
                    store.dispatch(customerDeletedAction(deletedCustomerID))
                    notify.success("Customer with ID '" + props.deleteModel.id + "' was successfully deleted!");

                    history.push("/admin");
                    break;

                case DeleteType.Coupon:

                    const responseCoupon = await jwtAxios.delete(globals.urls.deleteCompanyCoupon + props.deleteModel.id);
                    const deletedCouponID = responseCoupon.data;

                    store.dispatch(couponsDeletedAction(deletedCouponID));
                    notify.success("Coupon with ID '" + props.deleteModel.id + "' was successfully deleted!");

                    history.push("/company");
                    break;
            }

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="DeleteButton">
            
            <Button color="secondary" variant="outlined" onClick={handleClick} >
                Delete {props.deleteModel.deleteType}
            </Button>

        </div>
    );
}

export default DeleteButton;
