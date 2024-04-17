import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSettingMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Succeeded in Updating Setting.");

      queryClient.invalidateQueries({ queryKey: ["settings"], exact: true });
    },
  });

  return { updateSettingMutation, isUpdating };
}
