// activities.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, Req } from '@nestjs/common';
import { Activity } from './activities.schema';
import { ActivitiesService } from './activities.service';

@Controller('rest/activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async getAllActivities(): Promise<Activity[]> {
    return this.activitiesService.getAllActivities();
  }

  @Post()
  async createActivity(@Body() activityData: Partial<Activity>, @Req() request): Promise<Activity> {
    const userId = request.user.id; 
    activityData.userId = userId; 
    return this.activitiesService.createActivity(activityData);
  }

  @Get(':id')
  async getActivityById(@Param('id') id: string): Promise<Activity> {
    return this.activitiesService.getActivityById(id);
  }

  @Put(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() updatedActivityData: Partial<Activity>,
  ): Promise<Activity> {
    return this.activitiesService.updateActivity(id, updatedActivityData);
  }

  @Delete(':id')
  async deleteActivity(@Param('id') id: string): Promise<Activity> {
    return this.activitiesService.deleteActivity(id);
  }
}