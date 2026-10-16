import { Button, Group } from "@chakra-ui/react";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { CollectionView, collectionViewColors, collectionViewLabels } from "@/enums/shared/CollectionView";
import type { CollectionViewSwitchProps } from "@/props/custom/tables/CollectionViewSwitchProps";

const CollectionViewSwitch = ({ view, onChange }: CollectionViewSwitchProps) => <Group attached role="group" aria-label="Display layout">
  <Button type="button" size="sm" colorPalette={collectionViewColors[CollectionView.Grid]} variant={view === CollectionView.Grid ? "solid" : "outline"} aria-pressed={view === CollectionView.Grid} onClick={() => onChange(CollectionView.Grid)}><LuLayoutGrid />{collectionViewLabels[CollectionView.Grid]}</Button>
  <Button type="button" size="sm" colorPalette={collectionViewColors[CollectionView.List]} variant={view === CollectionView.List ? "solid" : "outline"} aria-pressed={view === CollectionView.List} onClick={() => onChange(CollectionView.List)}><LuList />{collectionViewLabels[CollectionView.List]}</Button>
</Group>;
export default CollectionViewSwitch;
