import type { Resource } from "./resource.types";

export const mockResources: Resource[] = [
  {
    id: "rack-01",
    name: "Rack R-01",
    floor: 1,
    status: "available",
    description: "Rack principal de servidores do primeiro andar. Contém switches core e servidores de aplicação. Manutenção preventiva realizada trimestralmente.",
  },
  {
    id: "rack-02",
    name: "Rack R-02",
    floor: 1,
    status: "unavailable",
    description: "Rack secundário para armazenamento de backup. Atualmente em manutenção para substituição de nobreaks e expansão de storage.",
  },
  {
    id: "rack-03",
    name: "Rack R-03",
    floor: 1,
    status: "available",
    description: "Rack de distribuição de rede local. Gerencia as conexões de rede de todos os laboratórios do bloco A.",
  },
  {
    id: "rack-04",
    name: "Rack R-04",
    floor: 2,
    status: "available",
    description: "Rack dedicado aos servidores de banco de dados do segundo andar. Ambiente climatizado com redundância de energia.",
  },
  {
    id: "rack-05",
    name: "Rack R-05",
    floor: 2,
    status: "available",
    description: "Rack de telefonia e PABX. Centraliza as comunicações de voz do campus e conexões de fibra óptica inter-blocos.",
  },
  {
    id: "rack-06",
    name: "Rack R-06",
    floor: 3,
    status: "available",
    description: "Rack de borda. Responsável pela conexão de internet principal e firewall do campus. Monitoramento 24/7.",
  },
  {
    id: "rack-07",
    name: "Rack R-07",
    floor: 3,
    status: "unavailable",
    description: "Rack de testes e desenvolvimento. Utilizado para homologação de novos equipamentos antes da entrada em produção.",
  },
  {
    id: "rack-08",
    name: "Rack R-08",
    floor: 3,
    status: "unavailable",
    description: "Rack de monitoramento e CFTV. Centraliza o processamento e gravação de câmeras de segurança do bloco C.",
  },
];
