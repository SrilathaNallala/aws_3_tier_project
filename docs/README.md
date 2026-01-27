

## Architecture Overview

This document explains the **architecture design** of my project in a simple and practical way. The goal of this architecture is to build a **highly available, secure, and disaster-resilient web application** using AWS services.

The architecture follows a **Multi-Region Warm Standby strategy**, where one AWS region actively serves users and another region remains ready to take over during failures.

---

## Why This Architecture Was Chosen

I chose this architecture to solve common real-world problems such as:

* Application downtime due to regional failures
* Traffic spikes during peak usage
* Security threats like DDoS and web attacks
* Data loss during unexpected failures

This design balances **cost, availability, and reliability**, making it suitable for production workloads.

---

## High-Level Design

The architecture is divided into three main layers:

1. **Global Layer** – Handles routing, security, and content delivery
2. **Regional Layer** – Hosts application infrastructure in each region
3. **Data Layer** – Manages databases, backups, and replication

---

## Global Layer (Common for All Regions)

### Amazon Route 53

* Routes user traffic using DNS
* Performs health checks on the application
* Redirects traffic to the standby region during failures

### Amazon CloudFront

* Serves content with low latency
* Provides HTTPS using SSL certificates
* Acts as an additional security layer

### AWS WAF

* Protects the application from common web attacks
* Blocks malicious IPs and suspicious requests

---

## Regional Layer (Primary & Secondary Regions)

Each region contains similar infrastructure to ensure quick failover.

### Networking

* Dedicated VPC in each region
* Public subnets for load balancers
* Private subnets for application and database layers
* NAT Gateway for secure outbound access

### Compute Layer

* EC2 instances for Web Tier (Frontend)
* EC2 instances for App Tier (Backend)
* Auto Scaling Groups to handle load automatically

### Load Balancing

* Application Load Balancer distributes traffic across instances
* Ensures fault tolerance within the region

---

## Data Layer

### Amazon RDS

* Primary database runs in the main region
* Read Replica exists in the standby region
* Supports quick promotion during disasters

### Backup Strategy

* Automated backups using AWS Backup
* Cross-region backup replication
* Ensures data recovery even during regional outages

---

## Disaster Recovery – Warm Standby Strategy

* Primary region handles all production traffic
* Secondary region runs minimal resources
* Health checks detect regional failures
* Route 53 shifts traffic to the standby region
* Database replica is promoted if needed

This approach reduces recovery time while controlling infrastructure costs.

---

## Security Considerations

* Application runs mostly in private subnets
* Bastion host used for controlled administrative access
* IAM roles used instead of hardcoded credentials
* Multiple security layers (WAF, SGs, NACLs)

---

## Scalability and Reliability

* Auto Scaling ensures the application scales based on demand
* Load balancers distribute traffic evenly
* Stateless application design enables easy scaling and failover

---

## Key Takeaways

This architecture demonstrates:

* Real-world AWS system design
* High availability and disaster recovery planning
* Secure and scalable cloud infrastructure
* DevOps and cloud best practices

---

## Author

**Nallala Srilatha**

---

## Final Thoughts

This architecture reflects how modern cloud-native applications are built on AWS. It focuses on reliability, security, and operational efficiency rather than just application code.
