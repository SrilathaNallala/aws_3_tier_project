# 🏗️ 3-Tier AWS Architecture with Disaster Recovery

This project is built using a **3-tier AWS architecture**.  
It separates the system into three layers: **Web Tier (frontend)**, **Application Tier (backend)**, and **Database Tier (data storage)**.  

The setup is deployed in **two AWS regions**:
- **Primary Region (us-east-1)** → Handles live traffic.
- **Disaster Recovery Region (us-west-2)** → Warm standby, used only if the primary region fails.

---

## 📌 Architecture Diagram
![Architecture Diagram](docs/architecture.png)

---

## 🔹 How It Works

### 1. Client Access
- Users connect through **Route 53 (DNS)** which decides where traffic goes.  
- **AWS WAF (Firewall)** protects the app from attacks.  
- **CloudFront (CDN)** makes content load faster for users worldwide.  

---

### 2. Primary Region (us-east-1)

- **Public Subnet**
  - A **Bastion Host (EC2)** is used for secure admin access.
  - **NAT Gateway** allows private servers to connect to the internet safely.

- **Web Tier**
  - Runs on **EC2 instances** (web servers).  
  - Managed by an **Auto Scaling Group** for handling more/less traffic.  
  - **Load Balancer** spreads traffic across servers.  

- **Application Tier**
  - Runs business logic on **EC2 instances**.  
  - Also behind a **Load Balancer** with Auto Scaling.  

- **Database Tier**
  - **Amazon RDS (Relational Database)** is deployed in **Multi-AZ** for high availability.  
  - One DB is primary, another is standby in a different AZ for failover.  

- **Backup**
  - **AWS Backup** regularly saves EC2 and RDS snapshots.  
  - A **Cross-Region Replica** keeps a copy of the database in the DR region.  

---

### 3. Disaster Recovery Region (us-west-2)

- Same structure as the primary (web, app, db layers).  
- Runs in **warm standby** → smaller capacity to save cost, but ready to scale up if needed.  
- **RDS Replica** keeps data synced from the primary region.  
- **Backups** can be restored here if needed.  
- **Route 53** will switch traffic here if the primary goes down.  

---

## 🔹 Key AWS Services Used
- **Route 53** → Routes traffic and does health checks.  
- **WAF** → Protects against common attacks.  
- **CloudFront** → Faster content delivery.  
- **EC2 + Auto Scaling + Load Balancers** → Scalable web & app servers.  
- **RDS (Multi-AZ + Cross-Region Replica)** → Reliable database with failover.  
- **AWS Backup** → Automatic backups.  
- **VPC, Subnets, NAT, Bastion Host** → Secure network design.  

---

## 🔹 Why This Architecture?
- **Scalable** → Auto Scaling adjusts servers based on demand.  
- **Highly Available** → Multi-AZ ensures no single point of failure.  
- **Secure** → WAF, Bastion, private subnets, and IAM roles.  
- **Disaster Recovery Ready** → Warm standby in another region.  
- **Fast** → CloudFront CDN for global users.  

---

## 🔹 Failover in Simple Words
1. Normally, users connect to **us-east-1** (primary).  
2. If it fails, **Route 53** detects the issue.  
3. Traffic is redirected to **us-west-2** (DR region).  
4. The **database replica** in DR takes over, and services continue with minimal downtime.  
