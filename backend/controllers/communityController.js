import Community from "../models/Community.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const joinCommunity = async (req, res) => {
  try {
    // Get user from token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find or create a default community (you might want to make this more dynamic)
    let community = await Community.findOne({ name: "Learn & Let Learn Community" });

    if (!community) {
      community = await Community.create({
        name: "Learn & Let Learn Community",
        description: "A community for learning and sharing knowledge",
        createdBy: userId,
        members: [userId]
      });
    } else {
      // Check if user is already a member
      if (community.members.includes(userId)) {
        return res.status(400).json({ message: "Already a member of this community" });
      }

      // Add user to community
      community.members.push(userId);
      await community.save();
    }

    res.status(200).json({
      message: "Successfully joined the community",
      community: {
        id: community._id,
        name: community.name,
        description: community.description
      }
    });
  } catch (err) {
    console.error('Join community error:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getCommunity = async (req, res) => {
  try {
    const community = await Community.findOne({ name: "Learn & Let Learn Community" })
      .populate('members', 'name email')
      .populate('createdBy', 'name email');

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json({ community });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};