'use client'

import TeamDetail from "@/components/team-detail";
import { getItems, getUsers } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";

export default function TeamMemberPage() {
  const params = useParams();
  const { slug } = params;
  const [firstname, lastname] = slug.split("-");
  const [agentData, setAgentData] = useState(null);
  const [agentProperties, setAgentProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchDataAgent = async () => {
      try {

        const dataTeam = await getUsers({
          fields: ["*.*"],
          filter: {
            first_name: { _contains: firstname },
            last_name: { _contains: lastname },
          },
        })

        // Find the matched agent based on first and last name (case-insensitive, trimmed)
        const matchedAgent = dataTeam?.find(
          (agent) =>
            agent.first_name?.trim().toLowerCase() === firstname.trim().toLowerCase() &&
            agent.last_name?.trim().toLowerCase() === lastname.trim().toLowerCase()
        );

        // Only fetch agent properties if matchedAgent exists
        //https://staging.cms.black-diamondz.62dev.org/items/agent_properties?fields=property_id.*.*&filter[user_id][_eq]=d936be1f-638e-42be-b6cd-eccc8dc4e8be ⁠
        let dataAgentProperties = null;
        if (matchedAgent && matchedAgent.id) {
          dataAgentProperties = await getItems("agent_properties", {
            fields: ["property_id.*.*"],
            filter: {
              user_id: {
                _eq: matchedAgent.id,
              },
            },
          });
        }

        setAgentData(matchedAgent || null);
        setAgentProperties(dataAgentProperties);
        setLoading(false);
      } catch (err) {
        setError("Failed to load home data:" + err.message);
      }
    };
    fetchDataAgent();
    
  }, []);

  
  return (
    <>
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        
        <TeamDetail member={agentData} agentProperties={agentProperties} />
      )}
    </>
  );
}
