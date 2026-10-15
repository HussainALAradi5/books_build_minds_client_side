import GenericSearchSelect from "@/Components/custom/forms/GenericSearchSelect";
import { publisherOptions } from "@/lib/catalog/publisherOptions";
import type { PublisherFilterProps } from "@/props/catalog/PublisherFilterProps";

const PublisherFilter = (props: PublisherFilterProps) => <GenericSearchSelect key={props.value}
  label="Publisher" placeholder="Search publishers…" loadOptions={publisherOptions} {...props} />;
export default PublisherFilter;
