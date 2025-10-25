import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import CampaignCard from "./CampaignCard";

export default function CampaignList() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { apiFetch("/campaigns").then(setItems); }, []);
  return <div className="grid">{items.map(c => <CampaignCard key={c.id} campaign={c} />)}</div>;
}