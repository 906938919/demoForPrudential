import React, { useState } from 'react';
import { Button, Input, Card, Form, Stepper } from 'antd-mobile'
import { AntOutline, RightOutline } from "antd-mobile-icons"
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  flash
} from '../models/counter';
import TabBar from "@/components/TabBar";


export default () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');


  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <Card
        title={
          <div style={{ fontWeight: 'normal' }}>
            <AntOutline style={{ marginRight: '4px', color: '#1677ff' }} />
            Demo
          </div>
        }
        extra={<RightOutline />}
        style={{ borderRadius: '16px', border: "1px solid #ccc", width: "9rem", margin: "0.2rem auto" }}
      >

        <Stepper
          value={count}
          style={{
            width: "8rem",
            margin: "0 auto",
            '--border': '1px solid #f5f5f5',
            '--border-inner': 'none',
            '--height': '0.96rem',
            '--input-background-color': '#ffffff',
            '--active-border': '1px solid #1677ff',
          }}
          onChange={value => {
            dispatch(flash(value))
          }}
        />

        <Form layout='vertical'>
          <Form.Item label='操作值'>
            <Input
              value={incrementAmount}
              onChange={(value) => setIncrementAmount(value)}
            />
          </Form.Item>
          <Form.Item label='操作'>
            <Button
              onClick={() => dispatch(incrementByAmount(incrementValue))}
            >
              Add
            </Button>
            <Button
              onClick={() => dispatch(incrementAsync(incrementValue))}
            >
              Add Async
            </Button>
            <Button
              onClick={() => dispatch(incrementIfOdd(incrementValue))}
            >
              Add If Odd
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <TabBar />
    </div>
  );
}
