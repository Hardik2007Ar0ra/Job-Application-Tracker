import { useDispatch, useSelector } from "react-redux";
import { addApplication, removeApplication, updateApplication } from "../store/applicationsSlice";

export default function useApplications() {
  const applications = useSelector((state) => state.applications);
  const dispatch = useDispatch();
  return {
    applications,
    add: (application) => dispatch(addApplication(application)),
    update: (application) => dispatch(updateApplication(application)),
    remove: (id) => dispatch(removeApplication(id)),
  };
}
