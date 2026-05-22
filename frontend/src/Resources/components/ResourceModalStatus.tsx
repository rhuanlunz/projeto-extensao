import { ResourceStatus } from "./ResourceStatus";
import type { ResourceStatus as StatusType } from "../services/resource.types";

interface ResourceModalStatusProps {
  status: StatusType;
}

export function ResourceModalStatus({ status }: ResourceModalStatusProps) {
  return (
    <div className="flex justify-end">
      <ResourceStatus status={status} />
    </div>
  );
}
