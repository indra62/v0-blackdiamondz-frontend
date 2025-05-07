'use client'

import TeamDetail from "@/components/team-detail";
import { getItems } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";

export default function TeamMemberPage() {
  const params = useParams();
  const { slug } = params;
  const [language, setLanguage] = useState("en");
  const [firstname, lastname] = slug.split("-");
  const [agentData, setAgentData] = useState(null);
  const [agentProperties, setAgentProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }

    const fetchDataAgent = async () => {
      try {
        const filter = {
          agents: {
            _some: {
              first_name: { _contains: firstname },
              last_name: { _contains: lastname }
            }
          }
        };

        const dataTeam = await getItems("aboutUs_team_support", {
          fields: ["*", "agents.*", "agents.translations.*"],
          filter,
          limit: 1,
        });

        //search agent https://staging.cms.black-diamondz.62dev.org/items/agent_properties?fields=property_id.*.*&filter%5Buser_id%5D%5B_eq%5D=d936be1f-638e-42be-b6cd-eccc8dc4e8be
        const dataAgentProperties = await getItems("agent_properties", {
          fields: ["*", "property_id.*.*"],
          filter: {
            user_id: {
              _eq: dataTeam?.id,
            },
          },
        });

        // Find the matched agent based on first and last name
        const matchedAgent = dataTeam?.agents?.find(
          (agent) =>
            agent.first_name?.toLowerCase().includes(firstname.toLowerCase()) &&
            agent.last_name?.toLowerCase().includes(lastname.toLowerCase())
        );

        setAgentData({ ...dataTeam, agents: matchedAgent ? [matchedAgent] : [] });
        setAgentProperties(dataAgentProperties);
        setLoading(false);
      } catch (err) {
        setError("Failed to load home data:" + err.message);
      }
    };
    fetchDataAgent();
  }, []);

  const translation =
    agentData?.agents?.[0]?.translations?.find((t) => t.languages_code === language) ||
    agentData?.agents?.[0]?.translations?.[0];  

  return (
    <>
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        <TeamDetail member={agentData} translation={translation} agentProperties={agentProperties} />
      )}
    </>
  );
}
