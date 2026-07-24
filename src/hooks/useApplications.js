import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applicationService } from "../appwrite/config";
import { addApplication, removeApplication, setApplications, setError, setLoading, updateApplication } from "../store/applicationsSlice";

export default function useApplications() {
  const { items: applications, loading, error } = useSelector((state) => state.applications);
  const dispatch = useDispatch();

  const load = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(""));
    try {
      dispatch(setApplications(await applicationService.list()));
    } catch (requestError) {
      dispatch(setError(requestError.message || "Could not load applications from Appwrite."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const add = async (application) => {
    const savedApplication = await applicationService.create(application);
    dispatch(addApplication(savedApplication));
  };
  const update = async (application) => {
    const savedApplication = await applicationService.update(application);
    dispatch(updateApplication(savedApplication));
  };
  const remove = async (id) => {
    await applicationService.remove(id);
    dispatch(removeApplication(id));
  };

  return { applications, loading, error, load, add, update, remove };
}
